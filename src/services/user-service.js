import axios from 'axios';
import { USERS_URL } from '../constants/api-endpoints';

export function getAllUsers() {
  return axios.get(USERS_URL);
}

export function getUserById(id) {
  return axios.get(`${USERS_URL}/${id}`);
}

export function updateUser(user) {
  return axios.put(`${USERS_URL}/${user.id}`, user);
}
