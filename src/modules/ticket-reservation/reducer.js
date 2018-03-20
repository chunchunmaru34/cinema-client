import {
  ADD_SEAT,
  REMOVE_SEAT,
  CLEAR_ORDER,
} from './action-types';

const initialState = {
  addedSeats: [],
  totalPrice: 0,
};

function ticketReservation(state = initialState, action) {
  switch (action.type) {
    case ADD_SEAT: {
      const seats = [...state.addedSeats];
      seats.push(action.data);
      return {
        ...state,
        addedSeats: seats,
      };
    }
    case REMOVE_SEAT: {
      const seats = [...state.addedSeats];
      const i = seats.findIndex(item => item._id === action.data._id);
      seats.splice(i, 1);
      return {
        ...state,
        addedSeats: seats,
      };
    }
    case CLEAR_ORDER:
      return {
        ...state,
        addedSeats: [],
      };

    default:
      return state;
  }
}

export default ticketReservation;
