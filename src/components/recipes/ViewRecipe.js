import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ViewRecipe extends Component {

  handleClick = () => {
    const { history } = this.props;
    const { recipe } = this.props.location.state;

    // Remove the id for consistent format between
    // existing recipe and a new recipe
    // id will be stored in params
    const recipeWithNoID = {...recipe};
    delete recipeWithNoID.id;

    history.push(`/recipe/edit/${recipe.id}`, { recipe: {...recipeWithNoID} });
  }

  ingredients = ingredientArray => {
    return ingredientArray.map(ingredient => {
      console.log(ingredient);
      return (
        <li key={ingredient.id}>{ingredient.name}</li>
      );
    });
  }

  render() {
    const { recipe } = this.props.location.state;

    return (
      <div>
        {`View recipe with id: ${recipe.id}`}

        <p>{`Name: ${recipe.recipeName}`}</p>
        {/* <ul>
          {this.ingredients(recipe.ingredients)}
        </ul> */}

        <Button
            // type="Submit"
            // className={classes.button}
          onClick={this.handleClick}
          color="primary"
          variant="contained"
        >
        Edit
        </Button>
      </div>
    );
  }
}

export default ViewRecipe;
