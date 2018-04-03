/* eslint-disable no-param-reassign */
import axios from 'axios';
import history from '../utils/history/index';
import { SIGN_IN_URL, SIGN_UP_URL } from '../constants/api-endpoints';
import { AUTH_TOKEN_NAME, AUTH_USER } from '../constants/auth';
import { LOGIN_ROUTE } from '../constants/routes';
import { APP_NAME } from '../constants/app';

export function login(credentials) {
  const payload = {
    ...credentials,
    app: APP_NAME,
  };
  return axios.post(SIGN_IN_URL, payload)
    .then((res) => {
      localStorage.setItem(AUTH_TOKEN_NAME, res.data.token);
      localStorage.setItem(AUTH_USER, JSON.stringify(res.data.user));
      return res.data.user;
    });
}

export function signUp(credentials) {
  return axios.post(SIGN_UP_URL, credentials)
    .then((res) => {
      localStorage.setItem(AUTH_TOKEN_NAME, res.data.token);
      localStorage.setItem(AUTH_USER, JSON.stringify(res.data.user));
      return res.data.user;
    });
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  localStorage.removeItem(AUTH_USER);
  history.push(LOGIN_ROUTE);
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_NAME);
}

export function getAuthenticatedUser() {
  return JSON.parse(localStorage.getItem(AUTH_USER));
}

