import configureAxios from '../../conf/axios-config';

import * as cinemaService from './cinema-service';
import * as movieSessionService from './movie-session-service';
import * as movieService from './movie-service';
import * as authService from './auth-service';

configureAxios();

export {
  cinemaService,
  movieSessionService,
  movieService,
  authService,
};
