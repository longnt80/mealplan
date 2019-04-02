import {
  REQUEST_RECIPES,
  REQUEST_RECIPES_SUCCESS,
  REQUEST_RECIPES_FAILURE,
  // GET_NO_RECIPE,
} from '../../../store/constants';

const initialState = {
  isGettingRecipes: false,
  error: null,
  data: null,
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RECIPES:
      return {
        ...state,
        isGettingRecipes: true,
      };
    case REQUEST_RECIPES_SUCCESS:
      return {
        isGettingRecipes: false,
        data: [...action.data]
      }
    case REQUEST_RECIPES_FAILURE:
      return {
        isGettingRecipes: false,
        data: null,
        error: action.error,
      }
    default:
      return state;
  }
};

export default recipesReducer;
