import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { func, objectOf, string, any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as recipeActions from './actions';

const styles = {
  paper: {
    padding: "1rem",
    cursor: "pointer",
    margin: "16px 0 8px"
  },
}

class AllRecipes extends Component {
  static propTypes = {
    appStatus: objectOf(any).isRequired,
    requestRecipes: func.isRequired,
    getRecipesFromLocalStorage: func.isRequired,
    classes: objectOf(string),
  };

  static defaultProps = {
    classes: {},
  }

  componentDidMount() {
    const { appStatus, requestRecipes, getRecipesFromLocalStorage } = this.props;
    if (appStatus.isAuthenticated) {
      // TODO: get only first 20
      // something like: getRecipes(limit, offset);
      requestRecipes();
    } else {
      getRecipesFromLocalStorage();
    }
  }

  componentDidUpdate(prevProps) {
    const { appStatus, requestRecipes, getRecipesFromLocalStorage } = this.props;

    if (prevProps.appStatus.user !== appStatus.user) {
      if (appStatus.user === null) {
        getRecipesFromLocalStorage();
      } else {
        requestRecipes();
      }
    }
  }

  handleClickOnRecipe = recipe => {
    const { history, setCurrentViewedRecipe } = this.props;


    setCurrentViewedRecipe(recipe);
    history.push(`/recipe/view/${recipe.id}`, { recipeID: recipe.id });
  }

  renderRecipesList = () => {
    const { recipesState, classes } = this.props;
    if (recipesState.data === null) return "Loading list ..."
    const recipesList = recipesState.data.map(recipe => (
      <Paper key={recipe.id} className={classes.paper} onClick={() => this.handleClickOnRecipe(recipe)}>{recipe.data.name}</Paper>
    ));

    if (recipesList.length === 0) return "Please add a recipe."

    return recipesList;
  }

  render() {

    return (
      <div>
        <div>
          <Button component={Link} to="/add-recipe" color="primary" variant="contained">Add a recipe</Button>
        </div>
        <TextField
          label="Search a recipe"
          margin="normal"
        />

        <div>
          {this.renderRecipesList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appStatus: state.appStatus,
  recipesState: state.recipesState,
});

const mapDispatchFromProps = dispatch => {
  const { requestRecipes, getRecipesFromLocalStorage, setCurrentViewedRecipe } = recipeActions;

  return ({
    requestRecipes: () => dispatch(requestRecipes()),
    getRecipesFromLocalStorage: () => dispatch(getRecipesFromLocalStorage()),
    setCurrentViewedRecipe: recipe => dispatch(setCurrentViewedRecipe(recipe)),
  })
};


export default connect(
  mapStateToProps,
  mapDispatchFromProps
)(withStyles(styles)(AllRecipes));
