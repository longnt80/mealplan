import React, { Component } from 'react';
import firebase from '../../config/fbConfig';

import AddOrEditRecipe from '../AddOrEditRecipe';

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

const STATUS = {
  ADD: 'add',
  EDIT: 'edit'
}

class AddOrEditRecipeWrapper extends Component {
  constructor(props) {
    super(props)
    const { state } = this.props.location;
    const recipeIsExisted = state && state.recipe;
    const recipe = recipeIsExisted || generateNewRecipe();
    const status = recipeIsExisted ? STATUS.EDIT : STATUS.ADD;
    this.state = {
      status,
      recipe: {...recipe}
    }
  }

  addIngredientField = currentValues => e => {
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
    console.log("delete ingr field: " + id);

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
    const db = firebase.firestore();

    return db.collection('recipes').add({
      ...recipe
    });
  }

  updateRecipe = recipe => {
    const db = firebase.firestore();
    const { id } = this.props.match.params;

    return db.collection('recipes').doc(id).set(recipe);
  }

  handleFormSubmit = (recipe, status) => {
    const { history } = this.props;

    if(status === STATUS.ADD) {
      this.addRecipe(recipe)
      .then(() => console.log("Added recipe"));
    } else if (status === STATUS.EDIT) {
      this.updateRecipe(recipe)
      .then(() => console.log("Updated recipe"));
    }

    history.goBack();
  }

  render() {
    return (
      <AddOrEditRecipe
        status={this.state.status}
        initialFields={this.state.recipe}
        addIngredientField={this.addIngredientField}
        handleFormSubmit={this.handleFormSubmit}
        deleteIngredientField={this.deleteIngredientField}
      />
    );
  }
}

export default AddOrEditRecipeWrapper;
