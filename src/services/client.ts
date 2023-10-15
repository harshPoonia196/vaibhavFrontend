import axios from 'axios';

export const SITE_URL = 'http://192.168.0.100:3000';

const client = axios.create({baseURL: SITE_URL});

export default client;
