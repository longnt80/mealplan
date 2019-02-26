import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
  recipeReducer,
  globalReducer
});

export default rootReducer;
