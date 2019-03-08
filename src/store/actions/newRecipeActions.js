export const ADD_RECIPE_TO_DB = 'ADD_RECIPE_TO_DB';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_ERROR = 'ADD_RECIPE_ERROR';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENT_FIELD = 'UPDATE_INGREDIENT_FIELD';
export const UPDATE_FIELD = 'UPDATE_FIELD';
export const RESET_RECIPE_FIELDS = 'RESET_RECIPE_FIELDS';

export const addRecipe = recipe => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({
      type: 'SENDING_REQUEST',
    })
    // make async call to database
    return firestore.collection('recipes').add({
      ...recipe
    })
    .then((docRef) => {
      dispatch({ type: ADD_RECIPE_SUCCESS });

      return true;
    })
    .catch( error => {
      dispatch({
        type: ADD_RECIPE_ERROR,
        error
      });

      return false;
    });
  }
};

export const resetRecipeFields = () => ({
  type: RESET_RECIPE_FIELDS,
});

export const updateRecipe = (id, updatedRecipe) => ({
  type: UPDATE_RECIPE,
  id: id,
  payload: updatedRecipe
});

export const deleteRecipe = id => ({
  type: DELETE_RECIPE,
  id,
});

export const addIngredientField = ingredient => ({
  type: ADD_INGREDIENT,
  ingredient,
});

export const deleteIngredientField = updatedIngredients => ({
  type: DELETE_INGREDIENT,
  updatedIngredients,
});

export const updateIngredientFields = (idx, value) => {
  return (dispatch, getState) => {
    const ingredientList = getState().recipeReducer.ingredients;

    const newList = [...ingredientList];

    newList[idx].name = value;
    dispatch({
      type: UPDATE_INGREDIENT_FIELD,
      newList,
    })
  }
};

export const updateFields = (name, value) => ({
  type: UPDATE_FIELD,
  name,
  value
})
