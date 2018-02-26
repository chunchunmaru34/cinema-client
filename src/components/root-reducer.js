import movieDetails from './movie/movie-details/reducer';
import movieList from './movie/movie-list/reducer';
import movieSessions from './movie/movie-session/reducer';

const initialState = {
  movieList: {},
  selectedMovie: {
    movieDetails: {},
    movieSessions: {},
  },
};

const rootReducer = (state = initialState, action) => ({
  movieList: movieList(state.movieList, action),
  selectedMovie: {
    movieDetails: movieDetails(state.selectedMovie.movieDetails, action),
    movieSessions: movieSessions(state.selectedMovie.movieSessions, action),
  },
});

export default rootReducer;
