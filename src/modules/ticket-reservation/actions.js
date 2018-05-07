import { ticketService, movieSessionService } from '../../services';
import {
  SEAT_ADDED,
  SEAT_REMOVED,
  ADDITION_INCREMENTED,
  DECREMENT_ADDITION,
  PAYMENT_FAILED,
  PAYMENT_SUCCEED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
  ORDER_CHECKOUT,
  ORDER_FINISH,
  PAYMENT_REQUESTED,
  MOVIE_SESSION_UNSELECTED,
  RESERVATION_CLEAR_STATE,
  ORDER_CHECKING_OUT_CANCELED,
  MOVIE_SESSION_RECEIVED,
  MOVIE_SESSION_REQUESTED,
  MOVIE_SESSION_REFRESH_REQUESTED,
  MOVIE_SESSION_REFRESH_RECEIVED,
  MOVIE_SESSION_SELECTED,
} from './action-types';

export function movieSessionRequested() {
  return {
    type: MOVIE_SESSION_REQUESTED,
  };
}

export function movieSessionReceived(movieSession) {
  return {
    type: MOVIE_SESSION_RECEIVED,
    data: movieSession,
  };
}

export function movieSessionRefreshRequested() {
  return {
    type: MOVIE_SESSION_REFRESH_REQUESTED,
  };
}

export function movieSessionRefreshReceived(movieSession) {
  return {
    type: MOVIE_SESSION_REFRESH_RECEIVED,
    data: movieSession,
  };
}

export function selectMovieSession(movieSession) {
  return {
    type: MOVIE_SESSION_SELECTED,
    data: movieSession,
  };
}

export function requestAndSelectMovieSession(movieSession) {
  return (dispatch) => {
    dispatch(movieSessionRequested());
    return movieSessionService.getMovieSessionById(movieSession.id)
      .then((res) => {
        dispatch(movieSessionReceived(res.data));
        dispatch(selectMovieSession(res.data));
      })
      .catch(console.log);
  };
}

export function refreshMovieSession(movieSession) {
  return (dispatch) => {
    dispatch(movieSessionRefreshRequested());
    return movieSessionService.getMovieSessionById(movieSession.id)
      .then(res => dispatch(movieSessionRefreshReceived(res.data)));
  };
}

export function unselectMovieSession() {
  return {
    type: MOVIE_SESSION_UNSELECTED,
  };
}

export function addSeat(seat) {
  return {
    type: SEAT_ADDED,
    data: seat,
  };
}

export function removeSeat(seat) {
  return {
    type: SEAT_REMOVED,
    data: seat,
  };
}

export function incrementAddition(addition) {
  return {
    type: ADDITION_INCREMENTED,
    data: addition,
  };
}

export function decrementAddition(addition) {
  return {
    type: DECREMENT_ADDITION,
    data: addition,
  };
}

export function paymentSucceed(transactionId) {
  return {
    type: PAYMENT_SUCCEED,
    data: transactionId,
  };
}

export function paymentFailed(err) {
  return {
    type: PAYMENT_FAILED,
    data: err,
  };
}

export function ticketReceived(ticket) {
  return {
    type: TICKET_RECEIVED,
    data: ticket,
  };
}

export function ticketReceivingFailed(err) {
  return {
    type: TICKET_RECEIVING_FAILED,
    data: err,
  };
}

export function paymentRequested() {
  return {
    type: PAYMENT_REQUESTED,
  };
}

export function requestTicket(order) {
  return dispatch => ticketService.requestTicket(order)
    .then(res => dispatch(ticketReceived(res.data)))
    .catch((err) => {
      dispatch(ticketReceivingFailed(err.response ? err.response.data.message : err.message));
    });
}

export function payForOrder(paymentInfo) {
  return (dispatch) => {
    dispatch(paymentRequested());
    return ticketService.pay(paymentInfo)
      .then(res => dispatch(paymentSucceed(res)))
      .catch((err) => {
        dispatch(paymentFailed(err.response ? err.response.data.message : err.message));
      });
  };
}

export function checkout() {
  return {
    type: ORDER_CHECKOUT,
  };
}

export function finishOrdering() {
  return {
    type: ORDER_FINISH,
  };
}

export function cancelCheckingOut() {
  return {
    type: ORDER_CHECKING_OUT_CANCELED,
  };
}

export function clearState(movieSession) {
  console.log('clearing tickets state');
  return {
    type: RESERVATION_CLEAR_STATE,
    data: movieSession,
  };
}
