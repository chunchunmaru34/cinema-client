import { ticketService } from '../../services';
import {
  ADD_SEAT,
  REMOVE_SEAT,
  CLEAR_ORDER,
  INCREMENT_ADDITION,
  DECREMENT_ADDITION,
  SELECT_MOVIE_SESSION,
  PAYMENT_FAILED,
  PAYMENT_SUCCEED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
  CHECKOUT,
  FINISH_ORDERING,
} from './action-types';

export function selectMovieSession(movieSession) {
  return {
    type: SELECT_MOVIE_SESSION,
    data: movieSession,
  };
}

export function addSeat(seat) {
  return {
    type: ADD_SEAT,
    data: seat,
  };
}

export function removeSeat(seat) {
  return {
    type: REMOVE_SEAT,
    data: seat,
  };
}

export function incrementAddition(addition) {
  return {
    type: INCREMENT_ADDITION,
    data: addition,
  };
}

export function decrementAddition(addition) {
  return {
    type: DECREMENT_ADDITION,
    data: addition,
  };
}

export function clearOrder() {
  return {
    type: CLEAR_ORDER,
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

export function requestTicket(order) {
  return dispatch => ticketService.requestTicket(order)
    .then(res => dispatch(ticketReceived(res.data)))
    .catch(err => dispatch(ticketReceivingFailed(err.response.data.error)));
}

export function payForOrder(paymentInfo) {
  return dispatch => ticketService.pay(paymentInfo)
    .then(res => dispatch(paymentSucceed(res)))
    .catch(err => dispatch(paymentFailed(err.response.data.error)));
}

export function checkout() {
  return {
    type: CHECKOUT,
  };
}

export function finishOrdering() {
  return {
    type: FINISH_ORDERING,
  };
}
