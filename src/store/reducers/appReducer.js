import { APP_LOADING_START, APP_LOADING_END } from '../constants';

const initialState = {
  loading: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING_START:
      return {
        loading: true,
      }
    case APP_LOADING_END:
      return {
        loading: false,
      }
    default:
      return state;
  }
}

export default appReducer;
