const ADD_RECIPE = 'ADD_RECIPE';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';

export const getAllRecipes = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    // Make async call to get all recipes

    // dispatch({
    //   type: GET_ALL_RECIPES,
    //   data: data
    // });
  }
}

export const addRecipe = recipe => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(firebase);
    console.log(firestore);

    // make async call to database
    dispatch({
      type: ADD_RECIPE,
      payload: recipe
    });
  }
};

export const updateRecipe = (id, updatedRecipe) => ({
  type: UPDATE_RECIPE,
  id: id,
  payload: updatedRecipe
});

export const deleteRecipe = id => ({
  type: DELETE_RECIPE,
  id: id
});


