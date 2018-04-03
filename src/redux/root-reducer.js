import movieDetails from '../modules/movie/movie-details/reducer';
import movieList from '../modules/movie/movie-list/reducer';
import movieSessions from '../modules/movie/movie-sessions/reducer';
import auth from '../modules/auth/reducer';
import profile from '../modules/user-profile/reducer';
import ticketReservation from '../modules/ticket-reservation/reducer';

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
  profile: profile(state.profile, action),
  ticketReservation: ticketReservation(state.ticketReservation, action),
});

export default rootReducer;
