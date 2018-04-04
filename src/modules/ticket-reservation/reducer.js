import {
  ADD_SEAT,
  REMOVE_SEAT,
  INCREMENT_ADDITION,
  DECREMENT_ADDITION,
  SELECT_MOVIE_SESSION,
  PAYMENT_FAILED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
  PAYMENT_SUCCEED,
  CHECKOUT,
  FINISH_ORDERING,
  PAYMENT_REQUESTED,
} from './action-types';
import { PAYMENT_SUCCESS, PAYMENT_FAIL, PAYMENT_PENDING } from './constants/payment-statuses';

const initialState = {
  order: {
    addedSeats: [],
    additions: {},
    totalPrice: 0,
    transactionId: null,
  },
  selectedMovieSession: null,
  paymentStatus: null,
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
      const additions = { ...state.order.additions };
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
    case PAYMENT_REQUESTED:
      return {
        ...state,
        paymentStatus: PAYMENT_PENDING,
      };
    case PAYMENT_SUCCEED:
      return {
        ...state,
        order: {
          ...state.order,
          transactionId: action.data,
        },
        paymentStatus: PAYMENT_SUCCESS,
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        error: action.data,
        paymentStatus: PAYMENT_FAIL,
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
        isCheckingOut: state.isCheckingOut,
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
        selectedMovieSession: state.selectedMovieSession,
      };
    default:
      return state;
  }
}

export default ticketReservation;
