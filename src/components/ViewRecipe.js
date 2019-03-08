import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ViewRecipe extends Component {

  handleClick = e => {
    const { history } = this.props;
    const { recipe } = this.props.location.state;

    history.push(`/recipe/edit/${recipe.id}`, recipe);
  }

  render() {
    return (
      <div>
        View recipe with id: {this.props.location.state.recipe.id}
        <Button
            // type="Submit"
            // className={classes.button}
            onClick={this.handleClick}
            color="primary"
            variant="contained"
            >Edit</Button>
      </div>
    );
  }
}

export default ViewRecipe;
