import {
  USER_REQUESTED,
  USER_RECEIVED,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCEED,
  INFO_CLEARED,
  ERROR_CLEARED,
  USER_PROFILE_CLEAR_STATE,
  TICKETS_REQUESTED,
  ALL_TICKETS_RECEIVED,
  RELEVANT_TICKETS_RECEIVED,
} from './action-types';

const initialState = {
  userDetails: null,
  tickets: null,
  error: null,
  info: null,
  isLoading: true,
  isTicketsRelevant: true,
  isTicketsLoading: true,
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case USER_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case USER_RECEIVED:
      return {
        ...state,
        userDetails: action.data,
        isLoading: false,
      };
    case USER_UPDATE_FAILED:
      return {
        ...state,
        isLoading: false,
        isTicketsLoading: false,
        error: action.data,
      };

    case USER_UPDATE_SUCCEED:
      return {
        ...state,
        userDetails: action.data,
        info: 'User was updated successfully',
      };

    case INFO_CLEARED:
      return {
        ...state,
        info: null,
      };

    case ERROR_CLEARED:
      return {
        ...state,
        error: null,
      };

    case TICKETS_REQUESTED:
      return {
        ...state,
        isTicketsLoading: true,
      };

    case ALL_TICKETS_RECEIVED:
      return {
        ...state,
        tickets: action.data,
        isTicketsRelevant: false,
        isTicketsLoading: false,
      };

    case RELEVANT_TICKETS_RECEIVED:
      return {
        ...state,
        tickets: action.data,
        isTicketsRelevant: true,
        isTicketsLoading: false,
      };

    case USER_PROFILE_CLEAR_STATE:
      return initialState;

    default:
      return state;
  }
}
