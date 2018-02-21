import {
  REQUEST_CINEMAS,
  RECEIVE_CINEMAS, SELECT_CINEMA,
} from '../actions/cinema-actions';

const cinemas = (state = [], action) => {
  switch (action.type) {
    case REQUEST_CINEMAS:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_CINEMAS:
      return Object.assign({}, state, {
        data: action.cinemas,
        isLoading: false,
      });
    case SELECT_CINEMA:
      return Object.assign({}, state, {
        selectedCinema: action.cinema,
      });
    default:
      return state;
  }
};

export default cinemas;
