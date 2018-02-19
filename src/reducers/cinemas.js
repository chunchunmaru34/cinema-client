import {
  REQUEST_CINEMAS,
  RECEIVE_CINEMAS,
} from '../actions';

const cinemas = (state = [], action) => {
  switch (action.type) {
    case REQUEST_CINEMAS:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_CINEMAS:
      return Object.assign({}, state, {
        data: action.cinemas,
        isLoading: false,
      });
    default:
      return state;
  }
};

export default cinemas;
