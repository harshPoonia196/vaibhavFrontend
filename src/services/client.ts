import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { logout, setAccessToken } from "store/admin";

// export const SITE_URL = "http://192.168.0.105:3000";
export const SITE_URL = "https://the-outcome-359211.uc.r.appspot.com";

const ROUTE_WITHOUT_TOKEN = ["login", "newAuthToken"];

const client = axios.create({
  baseURL: SITE_URL,
  // withCredentials: true,
});

export interface IRefreshResponse {
  accessToken: string;
}

type SubscriberType = (access_token: string) => void;

let subscribers: SubscriberType[] = [];

let isAlreadyFetchingAccessToken = false;

function addSubscriber(callback: (access_token: string) => void) {
  subscribers.push(callback);
}

function onAccessTokenFetched(accessToken: string) {
  subscribers = subscribers.filter((callback) => callback(accessToken));
}

export const refreshTokenApiCall = async (rToken: string) => {
  try {
    const url = `${SITE_URL}/newAuthToken`;
    const data = { refreshToken: rToken };
    const response: IRefreshResponse = await client.post(url, data);

    return await Promise.resolve(response.accessToken);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

client.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const { store } = require("../store");
    const authRoutes = ROUTE_WITHOUT_TOKEN.some((i) =>
      request?.url?.includes(i)
    );
    const { authToken } = store.getState().admin;

    if (!authRoutes && request.headers && authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
  },
  (error: AxiosError) => Promise.reject(error)
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.error) {
      return Promise.reject(response.data);
    }
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const { store } = require("../store");
    if (error?.config?.url?.includes("newAuthToken")) {
      store.dispatch(logout());
      return Promise.reject(error.response?.data);
    }

    if (error.response?.status === 401) {
      const originalRequest = error.config;

      try {
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((accessToken: string) => {
            if (originalRequest?.headers) {
              originalRequest.headers.Authorization = `${accessToken}`;
            }
            if (originalRequest) {
              resolve(client(originalRequest));
            }
          });
        });

        const { refreshToken: rToken } = store.getState().user;

        if (!isAlreadyFetchingAccessToken && rToken) {
          isAlreadyFetchingAccessToken = true;
          const accessToken = await refreshTokenApiCall(rToken);

          store.dispatch(setAccessToken(accessToken));
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(accessToken);
        }

        return await retryOriginalRequest;
      } catch (err: unknown) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error.response?.data);
  }
);

export default client;
