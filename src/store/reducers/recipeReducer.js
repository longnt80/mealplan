import {
  ADD_RECIPE_TO_DB,
  // UPDATE_RECIPE,
  // DELETE_RECIPE,
  ADD_RECIPE_ERROR,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENT_FIELD,
  UPDATE_FIELD,
} from '../actions/recipeActions';

const time = Date.now();

const initialRecipe = {
  recipeName: '',
  ingredients: [
    {
      name: "",
      amount: 0,
      unit: "",
      id: `ingr-${time}`
    }
  ],
  direction: "",
};

const recipeReducer = (state = initialRecipe, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.ingredient,
        ]
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...action.updatedIngredients
        ]
      };
    case UPDATE_INGREDIENT_FIELD:
      return {
        ...state,
        ingredients: [...action.newList]
      };
    case UPDATE_FIELD:
      return {
        ...state,
        [action.name]: action.value
      };
    default:
      return state;
  }
};

export default recipeReducer;
