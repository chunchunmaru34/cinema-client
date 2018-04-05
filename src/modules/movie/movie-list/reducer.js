import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
  MOVIES_REQUEST_FAILED,
  CLEAR_ERROR,
} from './action-types';

const initialState = {
  data: null,
  isLoading: true,
  error: null,
};

const movieList = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case MOVIES_RECEIVED:
      return {
        ...state,
        data: action.movies,
        isLoading: false,
      };
    case MOVIES_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default movieList;
