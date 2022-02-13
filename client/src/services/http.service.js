/* eslint-disable no-param-reassign */
import axios from 'axios';
import configFile from '../config.json';
import authService from './auth.service';
import {
  getAccessToken, getRefreshToken, getTokenExpiresDate, setTokens,
} from './localStorage.service';

const http = axios.create({
  baseURL: configFile.apiEndPoint,
});

http.interceptors.request.use(
  async (config) => {
    const expiresDate = getTokenExpiresDate();
    const refreshToken = getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      setTokens(data);
    }
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
};

export default httpService;
