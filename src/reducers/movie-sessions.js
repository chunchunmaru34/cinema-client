import { MOVIE_SESSION_SELECT } from '../actions';

const movieSessions = (state = [], action) => {
  switch (action.type) {
    case MOVIE_SESSION_SELECT:
      return {};
    default:
      return state;
  }
};

export default movieSessions;
