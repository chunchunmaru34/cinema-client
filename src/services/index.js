import axios from 'axios';

import * as cinemaService from './cinema-service';
import * as movieSessionService from './movie-session-service';
import * as movieService from './movie-service';
import * as authService from './auth-service';
import { AUTH_TOKEN_NAME } from '../constants/auth';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`;

export {
  cinemaService,
  movieSessionService,
  movieService,
  authService,
};
