import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import firebase from '../../config/fbConfig';

import { DB_RECIPES_COLLECTION } from '../../common/constants';

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

  addRecipe = recipe => {
    return db.collection(DB_RECIPES_COLLECTION).add({
      ...recipe
    });
  }

  updateRecipe = recipe => {
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

    // Remove empty ingredient fields
    const filteredIngredientsList = recipe.ingredients.filter(ingredient => ingredient.name !== "");
    const validRecipe = {
      ...recipe,
      ingredients: [
        ...filteredIngredientsList
      ]
    }

    if(status === STATUS.ADD) {
      this.addRecipe(validRecipe)
        .then(() => console.log("Added recipe"));
    } else if (status === STATUS.EDIT) {
      this.updateRecipe(validRecipe)
        .then(() => console.log("Updated recipe"));
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
