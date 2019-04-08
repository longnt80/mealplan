import React, { Component } from 'react';
import { objectOf, shape, string, any } from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import firebase from '../../config/fbConfig';

const colRef = firebase.firestore().collection('recipes');
class ViewRecipe extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        id: string,
      })
    }).isRequired,
    recipesState: objectOf(any).isRequired,
  }

  constructor(props) {
    super(props);
    const { match, recipesState } = this.props;

    this.state = {
      recipe: recipesState.data.find(item => item.id === match.params.id),
    }
  }


  componentDidMount() {
    const { match: { params: { id } }, appStatus: { isAuthenticated } } = this.props;

    if (isAuthenticated) {
      this.setState({
        recipe: this.getRecipeFromFirebase(id),
      })
    } else {
      this.setState({
        recipe: this.getRecipeFromLocalStorage(id),
      })
    }
  }

  handleClick = (recipe) => {
    const { history } = this.props;
    history.push(`/recipe/edit/${recipe.id}`, { recipe: {...recipe.data} });
  }

  ingredients = ingredientArray => {
    return ingredientArray.map(ingredient => {
      return (
        <li key={ingredient.id}>{ingredient.name}</li>
      );
    });
  }

  getRecipeFromFirebase = id => {
    colRef.doc(id).get().then(doc => doc.exists ? doc.data() : undefined);
  }

  getRecipeFromLocalStorage = id => {
    const localStorageRecipes = JSON.parse(window.localStorage.getItem('mp_recipes'));
    return localStorageRecipes.find(item => item.id === id);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { recipe } = this.state;
    if (!recipe) return `There's no matching recipe with this ${id}`;
    return (
      <div>
        {`View recipe with id: ${recipe.id}`}

        <p>{`Name: ${recipe.data.name}`}</p>
        {/* <ul>
          {this.ingredients(recipe.ingredients)}
        </ul> */}

        <Button
            // type="Submit"
            // className={classes.button}
          onClick={() => this.handleClick(recipe)}
          color="primary"
          variant="contained"
        >
        Edit
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appStatus: state.appStatus,
  recipesState: state.recipesState,
})

export default connect(
  mapStateToProps,
)(ViewRecipe);
