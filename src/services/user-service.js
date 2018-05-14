import axios from 'axios';
import qs from 'qs';

import { filter } from './utils/paramsFilter';
import { USERS_URL } from '../../conf/api-endpoints';

export function getUserBy(params) {
  const query = qs.stringify(filter(params));
  return axios.get(`${USERS_URL}?${query}`);
}

export function getUserById(id) {
  return axios.get(`${USERS_URL}/${id}`);
}

export function updateUser(user) {
  return axios.put(`${USERS_URL}/${user.id}`, user);
}
