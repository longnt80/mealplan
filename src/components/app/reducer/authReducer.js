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
  RESET_AUTH_STATE_ON_FIREBASE_LISTENER,
} from '../../../store/constants';

const initialState = {
  newUser: false,
  user: null,
  error: null,
}



const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: {...action.user}
      };
    case SIGNIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: {...action.user}
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case SIGNOUT_REQUEST:
      return {
        ...state,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.errMessage,
      }
    case RESET_AUTH_STATE:
      return {...initialState}
    case RESET_AUTH_STATE_ON_FIREBASE_LISTENER:
      return {...initialState}
    default:
      return state;
  }
}

export default authReducer;
