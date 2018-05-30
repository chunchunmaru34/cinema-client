import { ticketService, movieSessionService } from '../../services';
import {
  ADDITION_INCREMENTED,
  DECREMENT_ADDITION,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
  ORDER_CHECKOUT,
  ORDER_FINISH,
  MOVIE_SESSION_UNSELECTED,
  RESERVATION_CLEAR_STATE,
  ORDER_CHECKING_OUT_CANCELED,
  MOVIE_SESSION_RECEIVED,
  MOVIE_SESSION_REQUESTED,
  MOVIE_SESSION_REFRESH_REQUESTED,
  MOVIE_SESSION_REFRESH_RECEIVED,
  MOVIE_SESSION_SELECTED,
  TICKET_CREATE,
  TICKET_DELETE,
  TICKETS_CHECK_FOR_EXPIRATION,
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
      });
  };
}

export function checkTicketsForExpiration() {
  return {
    type: TICKETS_CHECK_FOR_EXPIRATION,
  };
}

export function refreshMovieSession(movieSession) {
  return (dispatch) => {
    dispatch(movieSessionRefreshRequested());
    return movieSessionService.getMovieSessionById(movieSession.id)
      .then((res) => {
        dispatch(movieSessionRefreshReceived(res.data));
        dispatch(checkTicketsForExpiration());
      });
  };
}

export function unselectMovieSession() {
  return {
    type: MOVIE_SESSION_UNSELECTED,
  };
}

export function incrementAddition({ movieSessionAddition, ticket }) {
  return {
    type: ADDITION_INCREMENTED,
    data: { movieSessionAddition, ticket },
  };
}

export function decrementAddition({ movieSessionAddition, ticket }) {
  return {
    type: DECREMENT_ADDITION,
    data: { movieSessionAddition, ticket },
  };
}

// todo: rename
export function ticketsReceived(tickets) {
  return {
    type: TICKET_RECEIVED,
    data: tickets,
  };
}

export function ticketReceivingFailed(err) {
  return {
    type: TICKET_RECEIVING_FAILED,
    data: err,
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

export function confirmOrder(tickets) {
  return dispatch => ticketService.updateTickets(tickets)
    .then(res => dispatch(ticketsReceived(res.data)))
    .catch(err =>
      dispatch(ticketReceivingFailed(err.response ? err.response.data.message : err.message)));
}

export function cancelCheckingOut() {
  return {
    type: ORDER_CHECKING_OUT_CANCELED,
  };
}

export function clearState(movieSession) {
  return {
    type: RESERVATION_CLEAR_STATE,
    data: movieSession,
  };
}

export function insertTicketToState(ticket) {
  return {
    type: TICKET_CREATE,
    data: ticket,
  };
}

export function removeTicketFromState(seatId) {
  return {
    type: TICKET_DELETE,
    data: {
      seatId,
    },
  };
}

export function createTicket(ticket) {
  return dispatch => ticketService.createTicket(ticket)
    .then(res => dispatch(insertTicketToState(res.data)));
}

export function deleteTicket(ticket) {
  return dispatch => ticketService.deleteTicket(ticket.id)
    .then(res => dispatch(removeTicketFromState(res.data)));
}

