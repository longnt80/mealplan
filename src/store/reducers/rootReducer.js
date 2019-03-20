import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  recipesReducer,
});

export default rootReducer;
