import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getAllRecipes } from '../../store/actions/recipesActions';

const styles = {
  paper: {
    padding: "1rem",
    cursor: "pointer",
    margin: "16px 0 8px"
  },
}

class AllRecipes extends Component {

  componentDidMount() {
    const { getAllRecipes } = this.props;

    getAllRecipes();
  }

  handleClick = recipe => e => {
    const { history } = this.props;

    history.push(`/recipe/view/${recipe.id}`, { recipe: { ...recipe } });
  }

  renderList = () => {
    const { recipes, classes } = this.props;
    if (!recipes) return "Loading list ..."

    return recipes.map((recipe, index) => (
      <Paper key={recipe.id} className={classes.paper} onClick={this.handleClick(recipe)}>{recipe.recipeName}</Paper>
    ));
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
          {this.renderList()}
        </div>
      </div>
    );
  }
}

AllRecipes.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipesReducer,
});

const mapDispatchFromProps = dispatch => ({
  getAllRecipes: () => dispatch(getAllRecipes()),
});

export default connect(
  mapStateToProps,
  mapDispatchFromProps
)(withStyles(styles)(AllRecipes));
