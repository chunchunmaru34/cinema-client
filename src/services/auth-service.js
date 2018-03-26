/* eslint-disable no-param-reassign */
import axios from 'axios';
import history from '../utils/history/index';
import { SIGN_IN_URL } from '../constants/api-endpoints';
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
      localStorage.setItem(AUTH_USER, res.data.user);
      return res.data.user;
    });
}

export function signUp(credentials) {
  return axios.post(`${AUTH_URL}/signup`, credentials)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem(AUTH_TOKEN_NAME, token);
      localStorage.setItem(AUTH_USER, user);
      return user;
    });
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  history.push(LOGIN_ROUTE);
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_NAME);
}

export function getAuthenticatedUser() {
  return localStorage.getItem(AUTH_USER);
}

