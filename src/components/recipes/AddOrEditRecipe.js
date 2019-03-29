import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

import { STATUS } from './AddOrEditRecipeWrapper';

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
  },
  danger: {
    backgroundColor: theme.palette.danger.main,
    color: '#fff'
  },
});

const schema = Yup.object().shape({
  recipeName: Yup.string().required('This is a required field'),
});

class MyForm extends Component {
  static propTypes = {
    currentStatus: PropTypes.string.isRequired,
    deleteIngredientField: PropTypes.func.isRequired,
    addIngredientField: PropTypes.func.isRequired,
    initialFields: PropTypes.shape({
      recipeName: PropTypes.string,
      direction: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number,
        id: PropTypes.string,
        name: PropTypes.string,
        unit: PropTypes.string
      }))
    }).isRequired,
  }

  renderIngredientFields = () => {
    const {
      handleBlur,
      handleChange,
      values,
      errors,
      touched,
      deleteIngredientField
    } = this.props;

    return values.ingredients.map((ingredient, idx) => {

      return (
        <Grid
          key={ingredient.id}
          container
          spacing={24}
          justify="space-between"
          className="ingredientField" // for testing purpose
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ingredient"
              name={`ingredients[${idx}].name`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ingredients[idx].name}
              fullWidth
            />
            {errors.ingredients && touched.ingredients ? (
              <FormHelperText error={!!errors.ingredients}>
                {errors.ingredients}
              </FormHelperText>
) : null
              }
          </Grid>
          <Grid item xs={12} sm={2}>
            <Grid container justify="center">
              <IconButton
                onClick={() => deleteIngredientField(ingredient.id, values)}
                tabIndex="-1"
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
      isSubmitting,
      addIngredientField,
      errors,
      touched,
      deleteRecipe,
      currentStatus,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Recipe's name:</Typography>
          <TextField
            label="Name"
            name="recipeName"
            error={!!errors.recipeName}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.recipeName}
          />
          {errors.recipeName && touched.recipeName ? (
            <FormHelperText
              id="component-error-text"
              error={!!errors.recipeName}
            >
              {errors.recipeName}
            </FormHelperText>
            ) : null
          }
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Ingredients:</Typography>
          { this.renderIngredientFields() }
          <div className={classes.buttonContainer}>
            <Button
              onClick={() => addIngredientField(values)}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </Paper>
        <div>
          <Button
            type="Submit"
            disabled={isSubmitting}
            className={classes.button}
            color="primary"
            variant="contained"
          >
          Save
          </Button>
          <Button
            component={Link}
            to="/recipes"
            className={classes.button}
            color="secondary"
            variant="contained"
          >
          Cancel
          </Button>
          {currentStatus === STATUS.EDIT ? (
            <Button
              onClick={deleteRecipe}
              className={[classes.button, classes.danger].join(" ")}
              variant="contained"
            >
            Delete
            </Button>
          ) : null }
        </div>
      </form>
    );
  }
}

const AddOrEditRecipe = withFormik({
  mapPropsToValues: props => {
    return {
      ...props.initialFields,
    };
  },
  enableReinitialize: true,
  validate: (values) => {
    const errors = {};
    const hasOneIngredient = values.ingredients.some(ingredient => ingredient.name !== "");

    if (!hasOneIngredient) {
      errors.ingredients = "At least one ingredient is required";
    }

    return errors;
  },
  validationSchema: schema,
  handleSubmit: (values, formikBag) => {
    const { props } = formikBag;

    props.handleFormSubmit(values, props.currentStatus);
  }
})(withStyles(styles)(MyForm));

export default AddOrEditRecipe;
