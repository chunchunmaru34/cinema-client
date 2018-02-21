import {
  REQUEST_MOVIE_SESSIONS,
  RECIEVE_MOVIE_SESSIONS,
} from '../actions/movie-session-actions';

const movieSessions = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_MOVIE_SESSIONS:
      return {};
    case RECIEVE_MOVIE_SESSIONS:
      return {};
    default:
      return state;
  }
};

export default movieSessions;
