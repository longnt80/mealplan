import React, { Component } from 'react';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

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
class MyForm extends Component {

  renderIngredientFields = () => {
    const {
      handleBlur,
      handleChange,
      values,
      deleteIngredientField
    } = this.props;

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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ingredients[idx].name}
              fullWidth
              />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Grid container justify="center">
              <IconButton
                onClick={() => deleteIngredientField(ingredient.id, values)}
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
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Recipe's name:</Typography>
          <TextField
            label="Name"
            name="recipeName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.recipeName}
            />
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2">Ingredients:</Typography>
          { this.renderIngredientFields() }
          <div className={classes.buttonContainer}>
            <Button
              onClick={addIngredientField(values)}
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

const AddOrEditRecipe = withFormik({
  mapPropsToValues: props => {
    return {
      ...props.initialFields,
    };
  },
  enableReinitialize: true,
  handleSubmit: (values, formikBag) => {
    const { props } = formikBag;
    const updatedRecipe = {...values};

    props.updateRecipe(updatedRecipe);
  }
})(withStyles(styles)(MyForm));

export default AddOrEditRecipe;