import {
  SEAT_ADDED,
  SEAT_REMOVED,
  ADDITION_INCREMENTED,
  DECREMENT_ADDITION,
  MOVIE_SESSION_UNSELECTED,
  PAYMENT_FAILED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
  PAYMENT_SUCCEED,
  ORDER_CHECKOUT,
  ORDER_FINISH,
  PAYMENT_REQUESTED,
  RESERVATION_CLEAR_STATE,
  ORDER_CHECKING_OUT_CANCELED,
  MOVIE_SESSION_RECEIVED,
  MOVIE_SESSION_REQUESTED,
  MOVIE_SESSION_SELECTED,
  MOVIE_SESSION_REFRESH_RECEIVED,
  MOVIE_SESSION_REFRESH_REQUESTED,
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
  isMovieSessionLoading: false,
  paymentStatus: null,
  ticket: null,
  error: null,
  isCheckingOut: false,
};

function ticketReservation(state = initialState, action) {
  switch (action.type) {
    case MOVIE_SESSION_REQUESTED:
      return {
        ...state,
        isMovieSessionLoading: true,
      };

    case MOVIE_SESSION_RECEIVED:
      return {
        ...state,
        isMovieSessionLoading: false,
      };

    case MOVIE_SESSION_SELECTED:
      return {
        ...initialState,
        selectedMovieSession: action.data,
      };

    case MOVIE_SESSION_REFRESH_REQUESTED:
      return state;

    case MOVIE_SESSION_REFRESH_RECEIVED:
      if (state.selectedMovieSession && state.selectedMovieSession.id === action.data.id) {
        return {
          ...state,
          selectedMovieSession: action.data,
        };
      }
      return state;

    case MOVIE_SESSION_UNSELECTED:
      return initialState;

    case SEAT_ADDED: {
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

    case SEAT_REMOVED: {
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

    case ADDITION_INCREMENTED: {
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
      if (!state.isCheckingOut) {
        return {
          ...initialState,
          isCheckingOut: state.isCheckingOut,
          selectedMovieSession: state.selectedMovieSession,
        };
      }
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

    case ORDER_CHECKOUT:
      return {
        ...state,
        isCheckingOut: true,
      };

    case ORDER_FINISH:
      return {
        ...initialState,
        selectedMovieSession: state.selectedMovieSession,
      };

    case ORDER_CHECKING_OUT_CANCELED:
      return {
        ...state,
        isCheckingOut: false,
      };

    case RESERVATION_CLEAR_STATE:
      if (state.selectedMovieSession) {
        return state.selectedMovieSession.id === action.data.id ? initialState : state;
      }
      return initialState;

    default:
      return state;
  }
}

export default ticketReservation;
