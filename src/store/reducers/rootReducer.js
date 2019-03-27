import { combineReducers } from 'redux';
import appReducer from './appReducer';
import recipesReducer from './recipesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  recipesReducer,
});

export default rootReducer;
