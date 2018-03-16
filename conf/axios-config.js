/* eslint-disable no-param-reassign */
import axios from 'axios';
import { AUTH_TOKEN_NAME } from '../src/constants/auth';

export default function configureAxios() {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    return config;
  });
}

