import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
  REQUEST_FAILED,
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
    case REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };
    default:
      return state;
  }
};

export default movieList;
