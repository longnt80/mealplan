/* eslint-disable import/prefer-default-export */
import {
  REQUEST_RECIPES,
  REQUEST_RECIPES_SUCCESS,
  REQUEST_RECIPES_FAILURE,
  // GET_NO_RECIPE,
} from '../../../store/constants';

/*
  Possible actions:
    - Requesting recipes
    - Requesting recipes SUCCESS:
      - EMPTY
      - NOT EMPTY
    - Requesting recipes ERROR
*/

export const requestRecipesSuccess = data => ({
  type: REQUEST_RECIPES_SUCCESS,
  data,
});

export const requestRecipesFailure = error => ({
  type: REQUEST_RECIPES_FAILURE,
  error,
});

// export const getNoRecipe = () => ({
//   type: GET_NO_RECIPE,
// })

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
            ...rest,
            id,
          };
        });

        dispatch(requestRecipesSuccess(actualData));
      })
      .catch(error => dispatch(requestRecipesFailure(error.message)));
  }
}

export const getRecipesFromLocalStorage = () => dispatch => {
  const recipes = window.localStorage.getItem('mp_recipes');
  dispatch({
    type: 'REQUEST_RECIPES_FROM_LOCAL_STORAGE'
  })
  if (recipes !== null) {
    dispatch(requestRecipesSuccess(recipes));
  } else {
    dispatch(requestRecipesSuccess([]));
  }
}
