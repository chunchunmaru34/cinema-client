import axios from 'axios';
import qs from 'qs';
import { CINEMAS_URL } from '../../conf/api-endpoints';

export function getAllCinemas() {
  return axios.get(CINEMAS_URL);
}

export function getCinemaById(id) {
  return axios.get(`${CINEMAS_URL}/${id}`);
}

export function getAllCinemasFor(params) {
  const query = qs.stringify(params);
  return axios.get(`${CINEMAS_URL}?${query}`);
}
