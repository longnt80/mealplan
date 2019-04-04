export const REQUEST_SIGN_IN_SUCCESS = 'REQUEST_SIGN_IN_SUCCESS';
export const requestSignInSuccess = user => ({
  type: REQUEST_SIGN_IN_SUCCESS,
  user
});

export const REQUEST_SIGN_IN_FAILURE = 'REQUEST_SIGN_IN_FAILURE';
export const requestSignInFailure = error => ({
  type: REQUEST_SIGN_IN_FAILURE,
  error: error.message
});

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const requestSignIn = (email, password) => (dispatch, getState, { getFirebase }) => {
  const auth = getFirebase().auth();

  dispatch({
    type: REQUEST_SIGN_IN,
  });

  return auth.signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(requestSignInSuccess(user));
    })
    .catch(error => {
      dispatch(requestSignInFailure(error))
    })
};

export const REQUEST_SIGN_UP_SUCCESS = 'REQUEST_SIGN_UP_SUCCESS';
export const requestSignUpSuccess = user => ({
  type: REQUEST_SIGN_UP_SUCCESS,
  user
});

export const REQUEST_SIGN_UP_FAILURE = 'REQUEST_SIGN_UP_FAILURE';
export const requestSignUpFailure = error => ({
  type: REQUEST_SIGN_UP_FAILURE,
  error: error.message
});

export const REQUEST_SIGN_UP = 'REQUEST_SIGN_UP';
export const requestSignUp = (email, password) => (dispatch, getState, { getFirebase }) => {
  const auth = getFirebase().auth();

  dispatch({
    type: REQUEST_SIGN_UP,
  });

  return auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(requestSignUpSuccess(user));
    })
    .catch(error => {
      dispatch(requestSignUpFailure(error))
    })
};

export const REQUEST_SIGN_OUT_SUCCESS = 'REQUEST_SIGN_OUT_SUCCESS';
export const requestSignOutSuccess = () => ({
  type: REQUEST_SIGN_OUT_SUCCESS,
});

export const REQUEST_SIGN_OUT_FAILURE = 'REQUEST_SIGN_OUT_FAILURE';
export const requestSignOutFailure = error => ({
  type: REQUEST_SIGN_OUT_FAILURE,
  error: error.message
});

export const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT';
export const requestSignOut = () => (dispatch, getState, { getFirebase }) => {
  const auth = getFirebase().auth();

  dispatch({
    type: REQUEST_SIGN_OUT,
  });
  auth.signOut()
    .then(() => {
      dispatch(requestSignOutSuccess())
    })
    .catch(error => {
      dispatch(requestSignOutFailure(error))
    })
};

export const FIREBASE_AUTH_OBSERVER_TRIGGERED = 'FIREBASE_AUTH_OBSERVER_TRIGGERED';
export const fbAuthObserverTriggered = (isAuthenticated, authUser) => ({
  type: FIREBASE_AUTH_OBSERVER_TRIGGERED,
  authUser,
  isAuthenticated,
})

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});
