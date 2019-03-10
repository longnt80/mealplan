import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import { cloneDeep } from 'lodash';

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

class AddOrEditRecipeWrapper extends Component {
  constructor(props) {
    super(props)
    const { state } = this.props.location;
    const recipeIsExisted = state && state.recipe;
    const recipe = recipeIsExisted || generateNewRecipe();
    const status = recipeIsExisted ? "edit" : "add";
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
    db.collection('recipes').add({
      ...recipe
    })
    .then(() => console.log("Added recipe"));
  }

  updateRecipe = recipe => {
    const db = firebase.firestore();
    const { id } = this.props.match.params;

    db.collection('recipes').doc(id).set(recipe)
      .then(result => {

        const newRecipe = cloneDeep(recipe);
        this.setState({
          recipe: {
            ...newRecipe
          }
        });
      })
  }

  handleFormSubmit = (recipe, status) => {
    if(status === 'add') {
      this.addRecipe(recipe);
    } else if (status === 'edit') {
      this.updateRecipe(recipe);
    }
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
