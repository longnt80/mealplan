import { GET_ALL_RECIPES } from '../constants';

export const getAllRecipes = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    // const firebase = getFirebase();

    return firestore.collection('recipes').get()
      .then(docs => {
        const actualData = docs.docs.map(doc => {
          const rest = doc.data();
          const id = doc.id;

          return {
            ...rest,
            id,
          };
        });

        dispatch({
          type: GET_ALL_RECIPES,
          data: actualData
        });

        return true;
      });

  }
}
