import axios from 'axios';

import * as cinemaService from './cinema-service';
import * as movieSessionService from './movie-session-service';
import * as movieService from './movie-service';
import * as authService from './auth-service';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export {
  cinemaService,
  movieSessionService,
  movieService,
  authService,
};
