import axios from 'axios';
import qs from 'qs';

import { filter } from './utils/paramsFilter';
import { MOVIES_URL } from '../../conf/api-endpoints';

export function getAllMovies() {
  return axios.get(MOVIES_URL);
}

export function getAllMoviesBy(params) {
  const query = qs.stringify(filter(params));
  return axios.get(`${MOVIES_URL}?${query}`);
}

export function getMovieById(id) {
  return axios.get(`${MOVIES_URL}/${id}`);
}
