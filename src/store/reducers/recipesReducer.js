import { GET_ALL_RECIPES } from '../actions/recipesActions';

const initialState = null;

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return action.data;
    default:
      return state;
  }
};

export default recipesReducer;