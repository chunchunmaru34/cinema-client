import axios from 'axios';
import qs from 'qs';
import { USERS_URL } from '../constants/api-endpoints';

export function getUserBy(params) {
  const query = qs.stringify(params);
  return axios.get(`${USERS_URL}?${query}`);
}

export function getAllUsers() {
  return axios.get(USERS_URL);
}

export function getUserById(id) {
  return axios.get(`${USERS_URL}/${id}`);
}

export function updateUser(user) {
  return axios.put(`${USERS_URL}/${user.id}`, user);
}
