import axios from 'axios';
import { MOVIES_URL } from '../constants/api-endpoints';

export function getAllMovies() {
  return axios.get(MOVIES_URL);
}

export function getMovieById(id) {
  return axios.get(`${MOVIES_URL}/${id}`);
}
