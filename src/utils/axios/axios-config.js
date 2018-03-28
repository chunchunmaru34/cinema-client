/* eslint-disable no-param-reassign */
import axios from 'axios';
import { authService } from '../../services/index';
import { AUTH_TOKEN_NAME } from '../../constants/auth';
import store from '../../redux/store';
import { loggedOut } from '../../modules/auth/actions';

function attachToken(config) {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
}
function handleTokenExpiration() {
  authService.logout();
  store.dispatch(loggedOut());
}

export default function configureAxios() {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.interceptors.request.use((request) => {
    attachToken(request);
    return request;
  });
  axios.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response.status === 401) {
        handleTokenExpiration();
      }
      return Promise.reject(error);
    },
  );
}
