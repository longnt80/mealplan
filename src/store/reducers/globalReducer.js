import {
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_ERROR
} from '../actions/newRecipeActions';

const initialState = {
  loading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SENDING_REQUEST':
      return {
        ...state,
        loading: true
      }
    case ADD_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case ADD_RECIPE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default globalReducer;
