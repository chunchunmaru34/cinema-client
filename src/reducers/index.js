import { combineReducers } from 'redux';
import movies from './movies';
import cinemas from './cinemas';
import movieDetails from './movie-details';

const rootReducer = combineReducers({
    movies,
    cinemas,
    movieDetails
});

export default rootReducer;