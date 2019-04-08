import {
  REQUEST_RECIPES,
  REQUEST_RECIPES_SUCCESS,
  REQUEST_RECIPES_FAILURE,
  RESET_ERROR_MESSAGE_RECIPES,
  VIEW_RECIPE,
} from '../actions';

const initialState = {
  isFetching: false,
  data: [],
  viewedRecipe: null,
  error: null,
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RECIPES:
      return {
        ...state,
        isFetching: true,
      };
    case REQUEST_RECIPES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: [...action.data],
        viewedRecipe: null,
      }
    case REQUEST_RECIPES_FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
        viewedRecipe: null,
        error: action.error,
      }
    case RESET_ERROR_MESSAGE_RECIPES:
      return {
        ...state,
        error: null,
      }
    case VIEW_RECIPE:
      return {
        ...state,
        viewedRecipe: {...action.recipe}
      }
    default:
      return state;
  }
};

export default recipesReducer;
