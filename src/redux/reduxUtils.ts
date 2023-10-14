/* eslint-disable no-param-reassign */

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {AppDispatch, RootState} from '.';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function handleLoading(state: any) {
  state.loading = true;
}

function handleReject(state: any, {payload}: any) {
  state.loading = false;
  state.errorMessage = payload?.error;
}

export {handleLoading, handleReject};
