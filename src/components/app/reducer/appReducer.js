import {
  REQUEST_SIGN_IN,
  REQUEST_SIGN_IN_SUCCESS,
  REQUEST_SIGN_IN_FAILURE,
  REQUEST_SIGN_UP,
  REQUEST_SIGN_UP_SUCCESS,
  REQUEST_SIGN_UP_FAILURE,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_OUT_SUCCESS,
  REQUEST_SIGN_OUT_FAILURE,
  RESET_ERROR_MESSAGE,
  FIREBASE_AUTH_OBSERVER_TRIGGERED,
} from '../actions/appActions';

const initialState = {
  firstTimeSignedIn: false,
  isAuthenticated: JSON.parse(localStorage.getItem('mp_authUser')) !== null,
  isSigningIn: false,
  isSigningUp: false,
  isSigningOut: false,
  user: JSON.parse(localStorage.getItem('mp_authUser')),
  error: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SIGN_IN:
      return {
        ...state,
        isSigningIn: true,
      }
    case REQUEST_SIGN_IN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
      }
    case REQUEST_SIGN_IN_FAILURE:
      return {
        ...state,
        isSigningIn: false,
        error: action.error,
      }
    case REQUEST_SIGN_UP:
      return {
        ...state,
        isSigningUp: true,
      }
    case REQUEST_SIGN_UP_SUCCESS:
      return {
        ...state,
        firstTimeSignedIn: true,
        isSigningUp: false,
      }
    case REQUEST_SIGN_UP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        error: action.error,
      }
    case REQUEST_SIGN_OUT:
      return {
        ...state,
        isSigningOut: true,
      }
    case REQUEST_SIGN_OUT_SUCCESS:
      return {
        ...state,
        isSigningOut: false,
      }
    case REQUEST_SIGN_OUT_FAILURE:
      return {
        ...state,
        isSigningOut: false,
        error: action.error,
      }
    case RESET_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
      }
    case FIREBASE_AUTH_OBSERVER_TRIGGERED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      }
    default:
      return state;
  }
}
