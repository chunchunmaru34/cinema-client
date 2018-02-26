import {
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
  CINEMA_SELECTED,
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
} from './action-types';

const initialState = {
  data: null,
  isLoading: false,
};

const movieSessions = (state = initialState, action) => {
  switch (action.type) {
    case CINEMAS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case CINEMAS_RECEIVED:
      return {
        ...state,
        cinemas: action.cinemas,
        isLoading: false,
      };
    case CINEMA_SELECTED:
      return {
        ...state,
        selectedCinema: action.cinema,
      };
    case MOVIE_SESSIONS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case MOVIE_SESSIONS_RECEIVED:
      return {
        ...state,
        isLoading: false,
        data: action.movieSessions,
      };
    default:
      return state;
  }
};

export default movieSessions;
