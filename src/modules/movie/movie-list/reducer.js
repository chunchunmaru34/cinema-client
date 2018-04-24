import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
  MOVIES_STATE_CLEARED,
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

    case MOVIES_STATE_CLEARED:
      return {
        ...initialState,
        data: state.data,
      };

    default:
      return state;
  }
};

export default movieList;
