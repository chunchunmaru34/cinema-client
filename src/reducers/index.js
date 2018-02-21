import { combineReducers } from 'redux';
import movies from './movies';
import cinemas from './cinemas';
import movieDetails from './movie-details';
import movieSessions from './movie-sessions';

const rootReducer = combineReducers({
  movies,
  cinemas,
  movieDetails,
  movieSessions,
});

export default rootReducer;
