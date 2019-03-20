import {
  SIGNIN_OR_SIGNUP,
  SIGNIN_OR_SIGNUP_SUCCESS,
  SIGNIN_OR_SIGNUP_FAILURE,
  RESET_AUTH_STATE
} from '../constants';

export const signingInOrUp = (email, password, isNewUser) => (dispatch, getState, { getFirebase })  => {
  const firebase = getFirebase();
  const auth = firebase.auth();

  dispatch({
    type: SIGNIN_OR_SIGNUP,
    isNewUser
  });

  if (isNewUser) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
    return auth.signInWithEmailAndPassword(email, password);
}

export const signInOrUpSuccess = (user) => ({
  type: SIGNIN_OR_SIGNUP_SUCCESS,
  user,
})

export const signInOrUpFailure = (error) => ({
  type: SIGNIN_OR_SIGNUP_FAILURE,
  error,
});

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE
});
