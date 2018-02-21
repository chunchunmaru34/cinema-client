import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  SELECT_MOVIE,
  REQUEST_MOVIE_DETAILS,
  RECEIVE_MOVIE_DETAILS,
} from '../actions/movie-actions';

const movies = (state = {}, action) => {
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

export default movies;
