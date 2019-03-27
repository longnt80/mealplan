import { APP_LOADING } from '../constants';

const initialState = {
  loading: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOADING:
      return {
        loading: action.state
      }
    default:
      return state;
  }
}

export default appReducer;
