import {
  ADD_SEAT,
  REMOVE_SEAT,
  CLEAR_ORDER,
  INCREMENT_ADDITION,
  DECREMENT_ADDITION, SELECT_MOVIE_SESSION,
  PAYMENT_FAILED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
} from './action-types';

const initialState = {
  selectedMovieSession: null,
  addedSeats: [],
  additions: {},
  totalPrice: 0,
  ticket: null,
  error: null,
};

function ticketReservation(state = initialState, action) {
  switch (action.type) {
    case SELECT_MOVIE_SESSION:
      return {
        ...state,
        selectedMovieSession: action.data,
      };
    case ADD_SEAT: {
      const seats = [...state.addedSeats];
      const seatPrice = state.selectedMovieSession.price * (action.data.kind.priceMultiplier || 1);
      seats.push(action.data);
      return {
        ...state,
        addedSeats: seats,
        totalPrice: state.totalPrice + seatPrice,
      };
    }
    case REMOVE_SEAT: {
      const seats = [...state.addedSeats];
      const i = seats.findIndex(item => item._id === action.data._id);
      const seatPrice = state.selectedMovieSession.price * (action.data.kind.priceMultiplier || 1);
      seats.splice(i, 1);
      return {
        ...state,
        addedSeats: seats,
        totalPrice: state.totalPrice - seatPrice,
      };
    }
    case INCREMENT_ADDITION: {
      const additions = { ...state.additions };
      const { name } = action.data.addition;
      if (!additions[name]) {
        additions[name] = 1;
      } else {
        additions[name] += 1;
      }
      return {
        ...state,
        additions,
        totalPrice: state.totalPrice + action.data.price,
      };
    }
    case DECREMENT_ADDITION: {
      const additions = { ...state.additions };
      const { name } = action.data.addition;
      additions[name] -= 1;
      return {
        ...state,
        additions,
        totalPrice: state.totalPrice - action.data.price,
      };
    }
    case CLEAR_ORDER:
      return {
        ...state,
        addedSeats: [],
        additions: {},
        totalPrice: 0,
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        error: action.data,
      };
    case TICKET_RECEIVED:
      return {
        ...state,
        ticket: action.data,
      };
    case TICKET_RECEIVING_FAILED:
      return {
        ...state,
        error: action.data,
      };
    default:
      return state;
  }
}

export default ticketReservation;
