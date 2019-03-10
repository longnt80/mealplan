import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import THEME from './common/theme';
import globalStyles from './common/globalStyles';

import Navbar from './components/Navbar';
import NextMeal from './components/NextMeal';
import AllRecipes from './components/AllRecipes';
import AddRecipe from './components/AddRecipe';
import ViewRecipe from './components/ViewRecipe';
import AddOrEditRecipeWrapper from './components/containers/AddOrEditRecipeWrapper';
import Plan from './components/Plan';
import Shopping from './components/Shopping';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <CssBaseline />
        <BrowserRouter>
            <div className="App">
              <Navbar />
              <Layout>
                <Switch>
                  <Route exact path="/" component={NextMeal} />
                  {/* Route for Recipes */}
                  <Route path="/recipes" component={AllRecipes} />
                  <Route path="/add-recipe" component={AddRecipe} />
                  <Route path="/recipe/view/:id" render={props => <ViewRecipe {...props} />} />
                  <Route path="/recipe/edit/:id" render={props => <AddOrEditRecipeWrapper {...props} />} />
                  <Route path="/plan" component={Plan} />
                  <Route path="/shopping" component={Shopping} />
                  <Route component={NoMatch} />
                </Switch>
              </Layout>
            </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(globalStyles)(App);
