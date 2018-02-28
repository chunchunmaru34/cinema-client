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
  cinemas: null,
  selectedCinema: null,
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
      // in case when same card was clicked twice
      if (state.selectedCinema && state.selectedCinema.id === action.cinema.id) {
        return state;
      }
      return {
        ...state,
        selectedCinema: action.cinema,
        data: null,
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
