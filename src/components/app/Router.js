import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import NextMeal from '../NextMeal';
import AllRecipes from '../recipes/AllRecipes';
import ViewRecipe from '../recipes/ViewRecipe';
import AddOrEditRecipeWrapper from '../recipes/AddOrEditRecipeWrapper';
import Plan from '../Plan';
import Shopping from '../Shopping';
import NoMatch from '../NoMatch';

const Router = ({ isAuthenticated }) => {
  return (
    <Switch>
      <Route exact path="/" component={NextMeal} />
      <Route path="/recipes" component={AllRecipes} />
      <Route path="/add-recipe" component={AddOrEditRecipeWrapper} />
      <Route path="/recipe/edit/:id" component={AddOrEditRecipeWrapper} />
      <Route path="/recipe/view/:id" component={ViewRecipe} />
      <Route path="/plan" component={Plan} />
      <Route path="/shopping" component={Shopping} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/login" component={SignIn} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default Router;
