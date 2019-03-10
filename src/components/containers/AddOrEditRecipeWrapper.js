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
    const recipe = (this.props.location.state.recipe) || generateNewRecipe();
    console.log(this.props);
    this.state = {
      ...recipe
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
      ...currentValues,
      ingredients: [
        ...currentValues.ingredients,
        emptyIngredientFields,
      ]
    });
  }

  deleteIngredientField = (id, currentValues) => {
    console.log("delete ingr field: " + id);

    const newIngredientList = currentValues.ingredients.filter(ingredient => ingredient.id !== id);

    this.setState({
      ...currentValues,
      ingredients: [
        ...newIngredientList
      ]
    });
  }

  updateRecipe = updatedRecipe => {
    const db = firebase.firestore();
    const { id } = this.props.match.params;
    // const noIdObject = {...updatedRecipe}
    // delete noIdObject.id;

    db.collection('recipes').doc(id).set(updatedRecipe)
      .then(result => {

        const newState = cloneDeep(updatedRecipe);
        this.setState({...newState});
      })
  }

  render() {
    return (
      <AddOrEditRecipe
        initialFields={this.state}
        addIngredientField={this.addIngredientField}
        updateRecipe={this.updateRecipe}
        deleteIngredientField={this.deleteIngredientField}
      />
    );
  }
}

export default AddOrEditRecipeWrapper;
