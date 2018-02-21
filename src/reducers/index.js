import { combineReducers } from 'redux';
import movies from './movies';
import cinemas from './cinemas';

const rootReducer = combineReducers({
  movies,
  cinemas,
});

export default rootReducer;
