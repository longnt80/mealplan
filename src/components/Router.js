import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import SignIn from './SignIn';
import NextMeal from './NextMeal';
import AllRecipes from './recipes/AllRecipes';
import ViewRecipe from './ViewRecipe';
import AddOrEditRecipeWrapper from './recipes/AddOrEditRecipeWrapper';
import Plan from './Plan';
import Shopping from './Shopping';
import NoMatch from './NoMatch';

const Router = ({ isAuthenticated }) => {
  return (
    <Switch>
      <PrivateRoute isAuthenticated={isAuthenticated} exact path="/" component={NextMeal} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/recipes" component={AllRecipes} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/add-recipe" component={AddOrEditRecipeWrapper} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/recipe/edit/:id" component={AddOrEditRecipeWrapper} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/recipe/view/:id" component={ViewRecipe} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/plan" component={Plan} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/shopping" component={Shopping} />
      <PrivateRoute isAuthenticated={isAuthenticated} path="/login" component={SignIn} />
      <PrivateRoute isAuthenticated={isAuthenticated} component={NoMatch} />
    </Switch>
  );
};

export default Router;
