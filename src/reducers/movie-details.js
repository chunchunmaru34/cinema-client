import {
  REQUEST_MOVIE_DETAILS,
  RECEIVE_MOVIE_DETAILS,
} from '../actions';

const movieDetails = (state = [], action) => {
  switch (action.type) {
    case REQUEST_MOVIE_DETAILS:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_MOVIE_DETAILS:
      return Object.assign({}, state, {
        data: action.movieDetails,
        isLoading: false,
      });
    default:
      return state;
  }
};

export default movieDetails;
