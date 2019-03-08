import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import newRecipeReducer from './newRecipeReducer';
import globalReducer from './globalReducer';

const rootReducer = combineReducers({
  newRecipeReducer,
  recipesReducer,
  globalReducer
});

export default rootReducer;
