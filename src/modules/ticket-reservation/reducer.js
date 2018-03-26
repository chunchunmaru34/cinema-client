import {
  ADD_SEAT,
  REMOVE_SEAT,
  CLEAR_ORDER,
  INCREMENT_ADDITION,
  DECREMENT_ADDITION, SELECT_MOVIE_SESSION,
  PAYMENT_FAILED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED, PAYMENT_SUCCEED, CHECKOUT, FINISH_ORDERING,
} from './action-types';

const initialState = {
  order: {
    addedSeats: [],
    additions: {},
    totalPrice: 0,
    transactionId: null,
  },
  selectedMovieSession: null,
  ticket: null,
  error: null,
  isCheckingOut: false,
};

function ticketReservation(state = initialState, action) {
  switch (action.type) {
    case SELECT_MOVIE_SESSION:
      return {
        ...state,
        selectedMovieSession: action.data,
      };
    case ADD_SEAT: {
      const seats = [...state.order.addedSeats];
      const seatPrice = state.selectedMovieSession.price * (action.data.kind.priceMultiplier || 1);
      seats.push(action.data);
      return {
        ...state,
        order: {
          ...state.order,
          addedSeats: seats,
          totalPrice: state.order.totalPrice + seatPrice,
        },
      };
    }
    case REMOVE_SEAT: {
      const seats = [...state.order.addedSeats];
      const i = seats.findIndex(item => item._id === action.data._id);
      const seatPrice = state.selectedMovieSession.price * (action.data.kind.priceMultiplier || 1);
      seats.splice(i, 1);
      return {
        ...state,
        order: {
          ...state.order,
          addedSeats: seats,
          totalPrice: state.order.totalPrice - seatPrice,
        },
      };
    }
    case INCREMENT_ADDITION: {
      const additions = { ...state.order.additions };
      const { name } = action.data.addition;
      if (!additions[name]) {
        additions[name] = 1;
      } else {
        additions[name] += 1;
      }
      return {
        ...state,
        order: {
          ...state.order,
          additions,
          totalPrice: state.order.totalPrice + action.data.price,
        },
      };
    }
    case DECREMENT_ADDITION: {
      const additions = { ...state.additions };
      const { name } = action.data.addition;
      additions[name] -= 1;
      return {
        ...state,
        order: {
          ...state.order,
          additions,
          totalPrice: state.order.totalPrice - action.data.price,
        },
      };
    }
    case CLEAR_ORDER:
      return {
        ...state,
        order: {
          addedSeats: [],
          additions: {},
          totalPrice: 0,
          transactionId: null,
        },
      };
    case PAYMENT_SUCCEED:
      return {
        ...state,
        order: {
          ...state.order,
          transactionId: action.data,
        },
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        error: action.data,
      };
    case TICKET_RECEIVED:
      return {
        ...initialState,
        isCheckingOut: state.isCheckingOut,
        selectedMovieSession: state.selectedMovieSession,
        ticket: action.data,
      };
    case TICKET_RECEIVING_FAILED:
      return {
        ...initialState,
        selectedMovieSession: state.selectedMovieSession,
        error: action.data,
      };
    case CHECKOUT:
      return {
        ...state,
        isCheckingOut: true,
      };
    case FINISH_ORDERING:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export default ticketReservation;
