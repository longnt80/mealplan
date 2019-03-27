import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET_AUTH_STATE,
  SIGNOUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
} from '../constants';

const initialState = {
  isSubmitting: false,
  newUser: false,
  isAuthenticated: false,
  user: {
    userEmail: null,
  },
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: true,
        user: {...action.user}
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: true,
        user: {...action.user}
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };
    case SIGNOUT_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.errMessage,
      }
    case RESET_AUTH_STATE:
      return {...initialState}
    default:
      return state;
  }
}

export default authReducer;
