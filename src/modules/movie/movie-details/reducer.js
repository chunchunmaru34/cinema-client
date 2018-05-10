import {
  MOVIE_DETAILS_RECEIVED,
  MOVIE_DETAILS_REQUESTED,
  MOVIE_SELECTED,
  MOVIE_DETAILS_STATE_CLEARED,
} from './action-types';

const initialState = {
  data: null,
  isLoading: true,
};

const movieDetails = (state = initialState, action) => {
  switch (action.type) {
    case MOVIE_DETAILS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case MOVIE_DETAILS_RECEIVED:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };

    case MOVIE_SELECTED:
      return {
        ...state,
        data: action.data,
      };

    case MOVIE_DETAILS_STATE_CLEARED:
      return initialState;

    default:
      return state;
  }
};

export default movieDetails;
