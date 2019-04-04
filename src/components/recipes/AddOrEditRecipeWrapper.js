import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import firebase from '../../config/fbConfig';

import { DB_RECIPES_COLLECTION } from '../../common/constants';
import AuthContext from '../../context';
import AddOrEditRecipe from './AddOrEditRecipe';

const db = firebase.firestore();

const generateNewRecipe = () => {
  const time = Date.now();

  return {
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
}

export const STATUS = {
  ADD: 'add',
  EDIT: 'edit'
}

class AddOrEditRecipeWrapper extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        recipe: PropTypes.shape({
          recipeName: PropTypes.string,
          direction: PropTypes.string,
          ingredients: PropTypes.arrayOf(PropTypes.shape({
            amount: PropTypes.number,
            id: PropTypes.string,
            name: PropTypes.string,
            unit: PropTypes.string
          }))
        })
      })
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    history: PropTypes.objectOf(any),
  }

  static defaultProps = {
    location: {},
    match: {},
    history: {},
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props)
    const { location } = this.props;
    const recipeIsExisted = location.state && location.state.recipe;
    const recipe = recipeIsExisted ? location.state.recipe : generateNewRecipe();
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

  addRecipeToLocalStorage = recipe => {
    console.log("Add recipe to local storage");
  };

  updateRecipeToLocalStorage = recipe => {
    console.log("Update recipe to local storage");
  }

  addRecipeToDatabase = recipe => {
    return db.collection(DB_RECIPES_COLLECTION).add({
      ...recipe
    });
  }

  updateRecipeToDatabase = recipe => {
    const { match } = this.props;

    return db.collection(DB_RECIPES_COLLECTION).doc(match.params.id).set(recipe, { merge: true });
  }

  deleteRecipe = () => {
    const { history } = this.props;
    const { match } = this.props;

    db.collection(DB_RECIPES_COLLECTION).doc(match.params.id).delete()
      .then(() => {
        console.log("Deleted");
        history.push('/recipes')
      });
  }

  handleFormSubmit = (recipe, status) => {
    const { history } = this.props;
    const { match } = this.props;
    const isAuthenticated = this.context;

    // Remove empty ingredient fields
    const filteredIngredientsList = recipe.ingredients.filter(ingredient => ingredient.name !== "");
    const validRecipe = {
      ...recipe,
      ingredients: [
        ...filteredIngredientsList
      ]
    }

    if(status === STATUS.ADD) {
      if (isAuthenticated) {
        this.addRecipeToDatabase(validRecipe)
          .then(() => console.log("Added recipe"));
      } else {
        this.addRecipeToLocalStorage(validRecipe);
      }
    } else if (status === STATUS.EDIT) {
      if (isAuthenticated) {
        this.updateRecipeToDatabase(validRecipe)
          .then(() => console.log("Updated recipe"));
      } else {
        this.updateRecipeToLocalStorage(validRecipe);
      }
    }

    history.push(`/recipe/view/${match.params.id}`, { recipe: { ...validRecipe } });
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

export default AddOrEditRecipeWrapper;
