import movieDetails from '../modules/movie/movie-details/reducer';
import movieList from '../modules/movie/movie-list/reducer';
import movieSessions from '../modules/movie/movie-session/reducer';
import auth from '../modules/auth/reducer';

const initialState = {
  selectedMovie: {},
};

const rootReducer = (state = initialState, action) => ({
  movieList: movieList(state.movieList, action),
  selectedMovie: {
    movieDetails: movieDetails(state.selectedMovie.movieDetails, action),
    movieSessions: movieSessions(state.selectedMovie.movieSessions, action),
  },
  auth: auth(state.auth, action),
});

export default rootReducer;
