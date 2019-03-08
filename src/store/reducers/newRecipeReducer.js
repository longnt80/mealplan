import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENT_FIELD,
  UPDATE_FIELD,
  RESET_RECIPE_FIELDS,
} from '../actions/newRecipeActions';

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
    case RESET_RECIPE_FIELDS:
      return {...initialRecipe};
    default:
      return state;
  }
};

export default recipeReducer;
