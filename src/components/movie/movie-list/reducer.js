import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  SELECT_MOVIE,
} from './action-constants';

const movieList = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        data: action.movies,
        isLoading: false,
      });
    case SELECT_MOVIE:
      return Object.assign({}, state, { selectedMovie: action.movie });
    default:
      return state;
  }
};

export default movieList;
