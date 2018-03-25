/* eslint-disable no-param-reassign */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import history from '../utils/history/index';
import { SIGN_IN_URL } from '../constants/api-endpoints';
import { AUTH_TOKEN_NAME } from '../constants/auth';
import { LOGIN_ROUTE } from '../constants/routes';
import { APP_ROLE } from '../constants/app';

export function login(credentials) {
  const payload = {
    ...credentials,
    appRole: APP_ROLE,
  };
  return axios.post(SIGN_IN_URL, payload)
    .then((res) => {
      localStorage.setItem(AUTH_TOKEN_NAME, res.data.token);
      return res.data.user;
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
  const token = getToken();
  if (!token) return null;
  return jwtDecode(token);
}

