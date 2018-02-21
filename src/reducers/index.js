import { combineReducers } from 'redux';
import movies from './movies';
import cinemas from './cinemas';
import movieSessions from './movie-sessions';

const rootReducer = combineReducers({
  movies,
  cinemas,
  movieSessions,
});

export default rootReducer;
