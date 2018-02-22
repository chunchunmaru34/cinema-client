import { combineReducers } from 'redux';
import movieList from './components/movie/movie-details/reducer';
import movieDetails from './components/movie/movie-list/reducer';

const rootReducer = combineReducers({
  movieList,
  movieDetails,
});

export default rootReducer;
