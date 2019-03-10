import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ViewRecipe extends Component {

  handleClick = e => {
    const { history } = this.props;
    const { recipe } = this.props.location.state;

    // Remove the id for consistency between
    // existing recipe and a new recipe
    // id wil be stored in params
    const noID = {...recipe};
    delete noID.id;

    history.push(`/recipe/edit/${recipe.id}`, { recipe: {...noID} });
  }

  ingredients = ingredientArray => {
    return ingredientArray.map(ingredient => {
      return (
        <li key={ingredient.id}>{ingredient.name}</li>
      );
    });
  }

  render() {
    const { recipe } = this.props.location.state;

    return (
      <div>
        View recipe with id: {recipe.id}

        <p>Name: {recipe.recipeName}</p>
        <ul>
          {this.ingredients(recipe.ingredients)}
        </ul>

        <Button
            // type="Submit"
            // className={classes.button}
            onClick={this.handleClick}
            color="primary"
            variant="contained"
            >Edit</Button>
      </div>
    );
  }
}

export default ViewRecipe;
