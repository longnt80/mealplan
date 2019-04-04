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
    recipes: objectOf(any).isRequired,
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

  handleClick = () => {
    // const { history } = this.props;

    // TODO: should get data out of ingredient document reference here

    // history.push(`/recipe/view/${recipe.id}`, { recipe: {...recipe} });
  }

  renderRecipesList = () => {
    const { recipes, classes } = this.props;
    if (recipes.data === null) return "Loading list ..."
    const recipesList = recipes.data.map(recipe => (
      <Paper key={recipe.id} className={classes.paper} onClick={() => this.handleClick(recipe)}>{recipe.name}</Paper>
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
  recipes: state.recipes,
  appStatus: state.appStatus,
});

const mapDispatchFromProps = dispatch => {
  const { requestRecipes, getRecipesFromLocalStorage } = recipeActions;

  return ({
    requestRecipes: () => dispatch(requestRecipes()),
    getRecipesFromLocalStorage: () => dispatch(getRecipesFromLocalStorage()),
  })
};


export default connect(
  mapStateToProps,
  mapDispatchFromProps
)(withStyles(styles)(AllRecipes));
