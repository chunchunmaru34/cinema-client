import axios from 'axios';
import qs from 'qs';

import { filter } from './utils/paramsFilter';
import { MOVIE_SESSIONS_URL } from '../../conf/api-endpoints';

export function getAllMovieSessions() {
  return axios.get(MOVIE_SESSIONS_URL);
}

export function getMovieSessionById(id) {
  return axios.get(`${MOVIE_SESSIONS_URL}/${id}`);
}

export function getAllMovieSessionsFor(params) {
  const query = qs.stringify(filter(params));
  return axios.get(`${MOVIE_SESSIONS_URL}?${query}`);
}
