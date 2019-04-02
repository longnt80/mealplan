import { combineReducers } from 'redux';
import appReducer from './appReducer';
import recipesReducer from '../../components/recipes/reducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  recipes: recipesReducer,
});

export default rootReducer;
