import { combineReducers } from 'redux';
import appReducer from '../../components/app/reducer/appReducer';
import recipesReducer from '../../components/recipes/reducer';
import authReducer from '../../components/app/reducer/authReducer';

const rootReducer = combineReducers({
  appStatus: appReducer,
  auth: authReducer,
  recipes: recipesReducer,
});

export default rootReducer;
