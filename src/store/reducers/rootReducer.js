import { combineReducers } from 'redux';
import appReducer from '../../components/app/reducer/appReducer';
import recipesReducer from '../../components/recipes/reducer';

const rootReducer = combineReducers({
  appStatus: appReducer,
  recipesState: recipesReducer,
});

export default rootReducer;
