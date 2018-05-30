import {
  ADDITION_INCREMENTED,
  DECREMENT_ADDITION,
  MOVIE_SESSION_UNSELECTED,
  TICKET_RECEIVED,
  TICKET_RECEIVING_FAILED,
  ORDER_CHECKOUT,
  ORDER_FINISH,
  RESERVATION_CLEAR_STATE,
  ORDER_CHECKING_OUT_CANCELED,
  MOVIE_SESSION_RECEIVED,
  MOVIE_SESSION_REQUESTED,
  MOVIE_SESSION_SELECTED,
  MOVIE_SESSION_REFRESH_RECEIVED,
  MOVIE_SESSION_REFRESH_REQUESTED,
  TICKET_CREATE,
  TICKET_DELETE,
  TICKETS_CHECK_FOR_EXPIRATION,
} from './action-types';

const initialState = {
  userTickets: [],
  totalPrice: 0,
  confirmedTickets: null,
  selectedMovieSession: null,
  isMovieSessionLoading: false,
  error: null,
  isCheckingOut: false,
};

function ticketReservation(state = initialState, action) {
  switch (action.type) {
    case TICKET_CREATE: {
      const tickets = [...state.userTickets];
      tickets.push(action.data);

      return {
        ...state,
        userTickets: tickets,
      };
    }

    case TICKET_DELETE: {
      const tickets = [...state.userTickets];
      const ticketIndex = tickets.findIndex(ticket => ticket.seatId === action.data.seatId);
      tickets.splice(ticketIndex, 1);

      return {
        ...state,
        userTickets: tickets,
      };
    }

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
        ...state,
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

    case ADDITION_INCREMENTED: {
      const tickets = [...state.userTickets];
      const ticketIndex = tickets.findIndex(ticket => ticket.id === action.data.ticket.id);
      const ticket = { ...tickets[ticketIndex] };

      const { ticketAdditions = [] } = ticket;
      let additionIndex = -1;

      if (ticketAdditions.length) {
        additionIndex = ticketAdditions
          .findIndex(addition =>
            addition.movieSessionAdditionId === action.data.movieSessionAddition.id);
      }

      if (additionIndex === -1) {
        const ticketAddition = {
          movieSessionAddition: action.data.movieSessionAddition,
          movieSessionAdditionId: action.data.movieSessionAddition.id,
          count: 1,
        };
        ticketAdditions.push(ticketAddition);
      } else {
        ticketAdditions[additionIndex].count += 1;
      }

      ticket.totalPrice += action.data.movieSessionAddition.price;

      ticket.ticketAdditions = ticketAdditions;
      tickets[ticketIndex] = ticket;

      return {
        ...state,
        userTickets: tickets,
      };
    }

    case DECREMENT_ADDITION: {
      const tickets = [...state.userTickets];
      const ticketIndex = tickets.findIndex(ticket => ticket.id === action.data.ticket.id);
      const ticket = { ...tickets[ticketIndex] };

      const { ticketAdditions = [] } = ticket;
      const additionIndex = ticket.ticketAdditions
        .findIndex(addition =>
          addition.movieSessionAdditionId === action.data.movieSessionAddition.id);

      if (additionIndex === -1) {
        const ticketAddition = {
          movieSessionAddition: action.data.movieSessionAddition,
          movieSessionAdditionId: action.data.movieSessionAddition.id,
          count: 0,
        };
        ticketAdditions.push(ticketAddition);
      } else {
        ticketAdditions[additionIndex].count -= 1;
      }

      ticket.totalPrice -= action.data.movieSessionAddition.price;

      tickets[ticketIndex] = ticket;

      return {
        ...state,
        userTickets: tickets,
      };
    }

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
        confirmedTickets: action.data,
        isCheckingOut: state.isCheckingOut,
        selectedMovieSession: state.selectedMovieSession,
      };

    case TICKET_RECEIVING_FAILED:
      return {
        ...state,
        error: action.data,
      };

    case TICKETS_CHECK_FOR_EXPIRATION: {
      if (!state.selectedMovieSession) {
        return { ...state };
      }

      const userTickets = [...state.userTickets];
      const { rows } = state.selectedMovieSession.room;
      const tickets = [];

      userTickets.forEach((ticket) => {
        const seat = rows
          .find(item => item.id === ticket.seat.rowId)
          .seats
          .find(item => item.id === ticket.seatId);

        if (seat.ticket) {
          tickets.push(ticket);
        }
      });

      return {
        ...state,
        userTickets: tickets,
      };
    }

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
        error: null,
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
