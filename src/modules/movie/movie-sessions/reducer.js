import {
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
  CINEMA_SELECTED,
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
  CINEMA_UNSELECTED,
  MOVIE_SESSIONS_STATE_CLEARED,
  MOVIE_SESSION_REFRESH_RECEIVED,
  MOVIE_SESSION_REFRESH_REQUESTED,
} from './action-types';

const initialState = {
  data: null,
  isCinemasLoading: true,
  isMovieSessionsLoading: true,
  isMovieSessionRefreshing: false,
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

    case MOVIE_SESSIONS_RECEIVED:
      // if data received, but user already selected another cinema
      if (action.data.length && action.data[0].cinema.id !== state.selectedCinema.id) {
        return state;
      }
      return {
        ...state,
        isMovieSessionsLoading: false,
        data: action.data,
      };

    case MOVIE_SESSION_REFRESH_REQUESTED:
      return {
        ...state,
        isMovieSessionRefreshing: true,
      };

    case MOVIE_SESSION_REFRESH_RECEIVED: {
      const data = [...state.data];
      const index = data.findIndex(item => item.id === action.data.id);
      data[index] = action.data;
      return {
        ...state,
        isMovieSessionRefreshing: false,
        data,
      };
    }

    case MOVIE_SESSIONS_STATE_CLEARED:
      return initialState;

    default:
      return state;
  }
};

export default movieSessions;
