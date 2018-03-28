import {
  REQUEST_USER,
  RECEIVE_USER,
} from './action-types';

const initialState = {
  userDetails: null,
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
      };
    case RECEIVE_USER:
      return {
        ...state,
        userDetails: action.data,
      };
    default:
      return state;
  }
}
