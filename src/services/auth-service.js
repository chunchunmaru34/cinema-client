import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AUTH_URL } from '../constants/api-endpoints';
import history from '../utils/history/index';
import {
  AUTH_TOKEN_NAME,
  PERMITTED_ROLE,
  ACCESS_FORBIDDEN_MESSAGE,
} from '../constants/auth';

export function login(credentials) {
  return axios.post(`${AUTH_URL}/signin`, credentials)
    .then((res) => {
      const user = jwtDecode(res.data.token);
      if (user.role !== PERMITTED_ROLE) {
        // imitating axios errors
        // todo: think of better solution
        const error = new Error();
        error.response = {
          data: {
            message: ACCESS_FORBIDDEN_MESSAGE,
          },
        };
        return Promise.reject(error);
      }
      localStorage.setItem(AUTH_TOKEN_NAME, res.data.token);
      return user;
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

export function getUserFromToken() {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    return jwtDecode(token);
  }
  return null;
}

