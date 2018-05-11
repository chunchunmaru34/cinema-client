import {
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
  CINEMA_SELECTED,
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
  CINEMA_UNSELECTED,
  MOVIE_SESSIONS_STATE_CLEARED,
} from './action-types';

const initialState = {
  data: null,
  isCinemasLoading: true,
  isMovieSessionsLoading: true,
  cinemas: null,
  selectedCinema: null,
};

const movieSessions = (state = initialState, action) => {
  switch (action.type) {
    case CINEMAS_REQUESTED:
      return {
        ...state,
        isCinemasLoading: true,
      };

    case CINEMAS_RECEIVED:
      return {
        ...state,
        cinemas: action.cinemas,
        isCinemasLoading: false,
      };

    case CINEMA_SELECTED:
      return {
        ...state,
        selectedCinema: action.cinema,
        data: null,
      };

    case CINEMA_UNSELECTED:
      return {
        ...state,
        selectedCinema: null,
        data: null,
      };

    case MOVIE_SESSIONS_REQUESTED:
      return {
        ...state,
        isMovieSessionsLoading: true,
      };

    case MOVIE_SESSIONS_RECEIVED: {
      // if data received, but user already selected another cinema
      const isMovieSessionsActual =
        action.data.length &&
        state.selectedCinema &&
        action.data[0].cinema.id !== state.selectedCinema.id;
      if (isMovieSessionsActual) {
        return state;
      }
      return {
        ...state,
        isMovieSessionsLoading: false,
        data: action.data,
      };
    }

    case MOVIE_SESSIONS_STATE_CLEARED:
      return initialState;

    default:
      return state;
  }
};

export default movieSessions;
