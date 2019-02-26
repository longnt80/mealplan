import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getAllRecipes } from '../store/actions/recipeActions';

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
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Button component={Link} to="/add-recipe" color="primary" variant="contained">Add a recipe</Button>
        </div>
        <TextField
          label="Search a recipe"
          margin="normal"
        />
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
        <Paper className={classes.paper}>Here's one recipe</Paper>
      </div>
    );
  }
}

AllRecipes.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchFromProps = dispatch => ({
  getAllRecipes: () => dispatch(getAllRecipes()),
});

export default connect(
  null,
  mapDispatchFromProps
)(withStyles(styles)(AllRecipes));
