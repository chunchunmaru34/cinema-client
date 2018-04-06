import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
  MOVIES_CLEAR_STATE,
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
    case MOVIES_CLEAR_STATE:
      return {
        ...initialState,
        data: state.data,
      };
  }
};

export default movieList;
