import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as recipeActions from './actions';
import firebase from '../../config/fbConfig';
import AuthContext from '../../context';

const styles = {
  paper: {
    padding: "1rem",
    cursor: "pointer",
    margin: "16px 0 8px"
  },
}

class AllRecipes extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const { auth, recipes, requestRecipes, getRecipesFromLocalStorage } = this.props;
    const isAuthenticated = this.context;
    if (isAuthenticated) {
      // TODO: get only first 20
      // something like: getRecipes(limit, offset);
      requestRecipes();
    } else {
      getRecipesFromLocalStorage();
    }
  }

  componentDidUpdate(prevProps) {
    const { auth, recipes, requestRecipes, getRecipesFromLocalStorage } = this.props;

    if (prevProps.auth.user !== auth.user) {
      if (this.props.auth.user === null) {
        getRecipesFromLocalStorage();
      } else {
        requestRecipes();
      }
    }
  }

  handleClick = recipe => {
    console.log("Hello");
    const { history } = this.props;
    const isAuthenticated = this.context;
    console.log(isAuthenticated);

    // TODO: should get data out of ingredient document reference here

    // history.push(`/recipe/view/${recipe.id}`, { recipe: {...recipe} });
  }

  renderRecipesList = () => {
    const isAuthenticated = this.context;
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

AllRecipes.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes,
  auth: state.auth,
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
