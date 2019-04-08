import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, string, objectOf, any, func } from 'prop-types';
import { DB_RECIPES_COLLECTION } from '../../common/constants';
import AddOrEditRecipe from './AddOrEditRecipe';
import * as recipesActions from  './actions';
import firebase from '../../config/fbConfig';

const db = firebase.firestore();

const generateNewRecipe = () => {
  const time = Date.now();

  return {
    createdBy: null,
    name: '',
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
}

export const STATUS = {
  ADD: 'add',
  EDIT: 'edit'
}

class AddOrEditRecipeWrapper extends Component {
  static propTypes = {
    appStatus: objectOf(any).isRequired,
    recipesState: objectOf(any).isRequired,
    match: shape({
      params: shape({
        id: string
      })
    }),
    history: objectOf(any),
    setCurrentViewedRecipe: func.isRequired,
  }

  static defaultProps = {
    match: {},
    history: {},
  }

  constructor(props) {
    super(props)
    const { recipesState } = this.props;
    const recipeIsExisted = recipesState.viewedRecipe !== null;
    const recipe = recipeIsExisted ? recipesState.viewedRecipe.data : generateNewRecipe();
    const status = recipeIsExisted ? STATUS.EDIT : STATUS.ADD;
    this.state = {
      status,
      recipe: {...recipe}
    }
  }

  addIngredientField = currentValues => {
    const time = Date.now();

    const emptyIngredientFields = {
      name: "",
      amount: 0,
      unit: "",
      id: `ingr-${time}`,
    };

    this.setState({
      recipe: {
        ...currentValues,
        ingredients: [
          ...currentValues.ingredients,
          emptyIngredientFields,
        ]
      }
    });
  }

  deleteIngredientField = (id, currentValues) => {
    const newIngredientList = currentValues.ingredients.filter(ingredient => ingredient.id !== id);

    this.setState({
      recipe: {
        ...currentValues,
        ingredients: [
          ...newIngredientList
        ]
      }
    });
  }

  addRecipeToLocalStorage = (newRecipe, newID) => {
    const { recipesState } = this.props;
    const copiedRecipes = [...recipesState.data]
    copiedRecipes.push({
      id: newID,
      data: {...newRecipe}
    });
    window.localStorage.setItem('mp_recipes', JSON.stringify(copiedRecipes));
  };

  updateRecipeToLocalStorage = (id, updatedRecipe) => {
    const localStorageRecipes = JSON.parse(window.localStorage.getItem('mp_recipes'));
    const recipeIndex = localStorageRecipes.findIndex(recipe => recipe.id === id);
    // console.log({localStorageRecipes, recipeIndex});
    localStorageRecipes.splice(recipeIndex, 1, {
      id,
      data: {...updatedRecipe},
    });
    window.localStorage.setItem('mp_recipes', JSON.stringify(localStorageRecipes));
  }

  addRecipeToDatabase = recipe => {
    return db.collection(DB_RECIPES_COLLECTION).add({
      ...recipe
    });
  }

  updateRecipeToDatabase = (id, recipe) => db.collection(DB_RECIPES_COLLECTION).doc(id).set(recipe, { merge: true });

  deleteRecipe = () => {
    const { match: { params }, history } = this.props;

    db.collection(DB_RECIPES_COLLECTION).doc(params.id).delete()
      .then(() => {
        history.push('/recipes')
      });
  }

  handleFormSubmit = (recipe, status) => {
    // console.log(recipe);
    const { appStatus, setCurrentViewedRecipe, history, match: { params } } = this.props;
    // Remove empty ingredient fields
    const filteredIngredientsList = recipe.ingredients.filter(ingredient => ingredient.name !== "");
    const validRecipe = {
      ...recipe,
      ingredients: [
        ...filteredIngredientsList
      ]
    }

    if(status === STATUS.ADD) {

      if (appStatus.isAuthenticated) {
        this.addRecipeToDatabase(validRecipe).then(docRef => {
          setCurrentViewedRecipe({
            id: docRef.id,
            data: {...validRecipe}
          });
          history.push(`/recipe/view/${docRef.id}`, { recipe: { ...validRecipe } });
        })
      } else {
        const id = `temp-recipe-${Date.now()}`;

        this.addRecipeToLocalStorage(validRecipe, id);
        setCurrentViewedRecipe({
          id,
          data: {...validRecipe}
        })
        history.push(`/recipe/view/${id}`, { recipe: { ...validRecipe } });
      }
    } else if (status === STATUS.EDIT) {
      if (appStatus.isAuthenticated) {
        this.updateRecipeToDatabase(params.id, validRecipe)
        setCurrentViewedRecipe({
          id: params.id,
          data: {...validRecipe}
        })
      } else {
        this.updateRecipeToLocalStorage(params.id, validRecipe);
        setCurrentViewedRecipe({
          id: params.id,
          data: {...validRecipe}
        })
      }
      history.push(`/recipe/view/${params.id}`, { recipe: { ...validRecipe } });
    }

  }

  render() {
    const { status, recipe } = this.state;

    return (
      <AddOrEditRecipe
        currentStatus={status}
        initialFields={recipe}
        deleteRecipe={status === STATUS.EDIT ? this.deleteRecipe : null}
        addIngredientField={this.addIngredientField}
        deleteIngredientField={this.deleteIngredientField}
        handleFormSubmit={this.handleFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  recipesState: state.recipesState,
  appStatus: state.appStatus,
});

const mapDispatchToProps = dispatch => {
  const { setCurrentViewedRecipe } = recipesActions;

  return ({
    setCurrentViewedRecipe: recipe => dispatch(setCurrentViewedRecipe(recipe))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditRecipeWrapper);
