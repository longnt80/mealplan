import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

import {
  addRecipe,
  addIngredientField,
  deleteIngredientField,
  updateIngredientFields,
  updateFields,
  resetRecipeFields,
} from '../store/actions/newRecipeActions';

const styles = theme => ({
  paper: {
    padding: "20px",
    marginBottom: "20px",
  },
  button: {
    '&:not(:first-child)': {
      marginLeft: "10px",
    }
  },
  buttonContainer: {
    margin: `20px 0 ${theme.spacing.unit}px`,
  }
});

const defaultEmptyIngredientFields = {
  id: "",
  name: "",
  amount: 0,
  unit: ""
};

class MyForm extends Component {

  ingredientOnChange = (handleChange, idx) => e => {
    const { value } = e.target;
    const { updateIngredientFields } = this.props;

    updateIngredientFields(idx, value);

    handleChange(e);
  }

  fieldOnChange = handleChange => e => {
    const { name, value } = e.target;
    const { updateFields } = this.props;

    updateFields(name, value);

    handleChange(e); // Formik
  }

  addIngredient = () => {
    const { addIngredientField } = this.props;
    const time = Date.now();

    const emptyIngredientFields = {
      ...defaultEmptyIngredientFields,
      id: `ingr-${time}`,
    };

    addIngredientField(emptyIngredientFields);
  };

  deleteIngredient = id => {
    const { deleteIngredientField, values } = this.props;

    if (values.ingredients.length < 2) return;

    const newList = values.ingredients.filter(ingredient => ingredient.id !== id);

    deleteIngredientField(newList);
  };

  renderIngredientFields = () => {
    const { handleBlur, handleChange, values } = this.props;

    return values.ingredients.map((ingredient, idx) => {

      return (
        <Grid
          key={ingredient.id}
          container
          spacing={24}
          justify="space-between"
        >
          <Grid item  xs={12} sm={6}>
            <TextField
              label="Ingredient"
              name={`ingredients[${idx}].name`}
              onChange={this.ingredientOnChange(handleChange, idx)}
              onBlur={handleBlur}
              value={values.ingredients[idx].name}
              fullWidth
              />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Grid container justify="center">
              <IconButton
                onClick={() => this.deleteIngredient(ingredient.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )
    })
  };

  render() {
    const {
      classes,
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      isSubmitting
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Recipe's name:</Typography>
          <TextField
            label="Name"
            name="recipeName"
            onChange={this.fieldOnChange(handleChange)}
            onBlur={handleBlur}
            value={values.recipeName}
            />
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Ingredients:</Typography>
          { this.renderIngredientFields() }
          <div className={classes.buttonContainer}>
            <Button
              onClick={this.addIngredient}
              size="small"
              variant="contained"
            >
              More ingredient
            </Button>
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Direction:</Typography>
          <TextField
            label="Direction"
            name="direction"
            multiline
            rows="10"
            variant="outlined"
            fullWidth
            onChange={this.fieldOnChange(handleChange)}
            onBlur={handleBlur}
            value={values.description}
            />
        </Paper>
        <div>
          <Button
            type="Submit"
            className={classes.button}
            disabled={isSubmitting}
            color="primary"
            variant="contained"
            >Save</Button>
          <Button
            component={Link}
            to="/recipes"
            className={classes.button}
            color="secondary"
            variant="contained"
          >Cancel</Button>
        </div>
      </form>
    );
  }
}

const mapStateTorops = state => ({
  recipe: state.newRecipeReducer
});

const mapDispatchToProps = dispatch => ({
  addIngredientField: ingredient => dispatch(addIngredientField(ingredient)),
  deleteIngredientField: newList => dispatch(deleteIngredientField(newList)),
  updateIngredientFields: (idx, value) => dispatch(updateIngredientFields(idx, value)),
  addRecipe: recipe => dispatch(addRecipe(recipe)),
  updateFields: (name, value) => dispatch(updateFields(name, value)),
  resetRecipeFields: () => dispatch(resetRecipeFields()),
});

const EnhancedForm = withFormik({
  mapPropsToValues: props => {
    return {
      ...props.recipe,
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, formikBag) => {
    const { addRecipe, resetRecipeFields, history } = formikBag.props;

    addRecipe(values).then((success) => {
      console.log(success);
      if (success) {
        console.log("Success!!!");
        resetRecipeFields();
        history.push('/recipes');
        formikBag.setSubmitting(false);
      } else {
        console.log("Fail to add data");
        formikBag.setSubmitting(false);
      }
    });
  }
})(withStyles(styles)(MyForm));

export default connect(
  mapStateTorops,
  mapDispatchToProps
)(EnhancedForm);
