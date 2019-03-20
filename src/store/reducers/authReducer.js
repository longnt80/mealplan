import {
  SIGNIN_OR_SIGNUP,
  SIGNIN_OR_SIGNUP_SUCCESS,
  SIGNIN_OR_SIGNUP_FAILURE,
  RESET_AUTH_STATE,
} from '../constants';

const initialState = {
  isSubmitting: false,
  newUser: false,
  isAuthenticated: false,
  user: {
    uid: null,
    userEmail: null,
  },
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_OR_SIGNUP:
      return {
        ...state,
        isSubmitting: true,
        isNewUser: action.isNewUser,
      };
    case SIGNIN_OR_SIGNUP_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: true,
        user: {...action.user}
      };
    case SIGNIN_OR_SIGNUP_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };
    case RESET_AUTH_STATE:
      return {...initialState}
    default:
      return state;
  }
}

export default authReducer;
