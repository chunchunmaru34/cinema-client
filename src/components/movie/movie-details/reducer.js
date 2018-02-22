import { RECEIVE_MOVIE_DETAILS, REQUEST_MOVIE_DETAILS } from './action-constants';

const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_MOVIE_DETAILS:
      return Object.assign({}, state, {
        movieDetails: {
          isLoading: true,
        },
      });
    case RECEIVE_MOVIE_DETAILS:
      return Object.assign({}, state, {
        movieDetails: {
          data: action.movieDetails,
          isLoading: false,
        },
      });
    default:
      return state;
  }
};

export default movieDetails;
