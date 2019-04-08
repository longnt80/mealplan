/* eslint-disable import/prefer-default-export */
export const RESET_ERROR_MESSAGE_RECIPES = 'RESET_ERROR_MESSAGE_RECIPES';
export const resetRecipesErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE_RECIPES,
});

export const REQUEST_RECIPES_SUCCESS = 'REQUEST_RECIPES_SUCCESS';
export const requestRecipesSuccess = data => ({
  type: REQUEST_RECIPES_SUCCESS,
  data,
});

export const REQUEST_RECIPES_FAILURE = 'REQUEST_RECIPES_FAILURE';
export const requestRecipesFailure = error => ({
  type: REQUEST_RECIPES_FAILURE,
  error,
});

// export const getNoRecipe = () => ({
//   type: GET_NO_RECIPE,
// })
export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const requestRecipes = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    dispatch({
      type: REQUEST_RECIPES,
    })
    // TODO: not all recipes but pagination
    return firestore.collection('recipes').get()
      .then(docs => {
        const actualData = docs.docs.map(doc => {
          const rest = doc.data();
          const { id } = doc;
          return {
            id,
            data: {...rest}
          };
        });

        dispatch(requestRecipesSuccess(actualData));
      })
      .catch(error => dispatch(requestRecipesFailure(error.message)));
  }
}

export const REQUEST_RECIPES_FROM_LOCAL_STORAGE = 'REQUEST_RECIPES_FROM_LOCAL_STORAGE'
export const getRecipesFromLocalStorage = () => dispatch => {
  const mpRecipes = JSON.parse(window.localStorage.getItem('mp_recipes'));
  const recipes = mpRecipes !== null ? mpRecipes : [];
  dispatch({
    type: REQUEST_RECIPES_FROM_LOCAL_STORAGE
  })
  dispatch(requestRecipesSuccess(recipes));
}

export const VIEW_RECIPE = 'VIEW_RECIPE';
export const setCurrentViewedRecipe = recipe => ({
  type: VIEW_RECIPE,
  recipe,
})
