import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AUTH_URL } from '../constants/api-endpoints';
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
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_NAME);
}

export function getUserFromToken() {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return (token && jwtDecode(token)) || null;
}

