import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AUTH_URL } from '../constants/api-endpoints';
import history from '../utils/history/index';
import { AUTH_TOKEN_NAME } from '../constants/auth';

export function login(credentials) {
  const payload = {
    ...credentials,
    appRole: 'user',
  };
  return axios.post(`${AUTH_URL}/signin`, payload)
    .then((res) => {
      const user = jwtDecode(res.data.token);
      localStorage.setItem(AUTH_TOKEN_NAME, res.data.token);
      return user;
    });
}

export function signUp(credentials) {
  return axios.post(`${AUTH_URL}/signup`, credentials)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem(AUTH_TOKEN_NAME, token);
      return jwtDecode(token);
    });
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  history.push('/login');
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_NAME);
}

export function isTokenExpired(token) {
  const currentTime = Date.now().valueOf() / 1000;
  const payload = jwtDecode(token);
  return payload.exp < currentTime;
}

export function getAuthenticatedUser() {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    return jwtDecode(token);
  }
  return null;
}

