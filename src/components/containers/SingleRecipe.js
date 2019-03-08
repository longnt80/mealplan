import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ViewRecipe from '../ViewRecipe';
import EditRecipe from '../EditRecipe';

class SingleRecipe extends Component {

  render() {
    const { match } = this.props;

    return (
      <div>
        <Switch>

        </Switch>
      </div>
    );
  }
}

export default SingleRecipe;
