import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
} from '../actions';

const movies = (state = [], action) => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        data: action.movies,
        isLoading: false,
      });

    default:
      return state;
  }
};

export default movies;
