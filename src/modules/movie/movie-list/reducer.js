import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
} from './action-types';

const initialState = {
  data: null,
  isLoading: true,
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
    default:
      return state;
  }
};

export default movieList;
