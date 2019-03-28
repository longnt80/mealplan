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

import { globalLoading } from './appActions';

export const signInFailure = (error) => ({
  type: SIGNIN_FAILURE,
  error,
});

export const signInSuccess = (user) => ({
  type: SIGNIN_SUCCESS,
  user,
});

export const signingIn = (email, password) => (dispatch, getState, { getFirebase })  => {
  const firebase = getFirebase();
  const auth = firebase.auth();

  dispatch({
    type: SIGNIN_REQUEST,
  });

  return auth.signInWithEmailAndPassword(email, password);
}

export const signUpFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
});

export const signUpSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
});

export const signingUp = (email, password) => (dispatch, getState, { getFirebase })  => {
  const auth = getFirebase().auth();

  dispatch({
    type: SIGNUP_REQUEST,
  });
  return auth.createUserWithEmailAndPassword(email, password);
}

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutFailure = (errMessage) => ({
  type: SIGN_OUT_FAILURE,
  errMessage,
});

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const auth = getFirebase().auth();

  dispatch({
    type: SIGNOUT_REQUEST,
  });

  dispatch(globalLoading(true));
  auth.signOut()
    .then(() => {
      dispatch(globalLoading(false));
      dispatch(signOutSuccess());
    })
    .catch((err) => {
      const errMessage = err.message;

      dispatch(globalLoading(false));
      dispatch(signOutFailure(errMessage));
    })
}

