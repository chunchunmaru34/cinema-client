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

export function paymentSucceed() {
  return {
    type: PAYMENT_SUCCEED,
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

export function requestTicket(transactionId, order) {
  return (dispatch) => {
    ticketService.requestTicket(transactionId, order)
      .then(res => dispatch(ticketReceived(res)))
      .catch(err => dispatch(ticketReceivingFailed(err)));
  };
}

export function payForOrder(order, paymentInfo) {
  return (dispatch) => {
    ticketService.pay(paymentInfo)
      .then((res) => {
        dispatch(paymentSucceed(res));
        return dispatch(requestTicket(res, order));
      })
      .catch(err => paymentFailed(err));
  };
}
