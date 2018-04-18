import axios from 'axios';
import { MOVIES_URL } from '../../conf/api-endpoints';

export function getAllMovies() {
  return axios.get(MOVIES_URL);
}

export function getMovieById(id) {
  return axios.get(`${MOVIES_URL}/${id}`);
}
