import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from "react-router-dom";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Modal from '@material-ui/core/Modal';
import Cached from '@material-ui/icons/Cached';

import THEME from './common/theme';
import globalStyles from './common/globalStyles';

import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import NextMeal from './components/NextMeal';
import AllRecipes from './components/AllRecipes';
import ViewRecipe from './components/ViewRecipe';
import AddOrEditRecipeWrapper from './components/containers/AddOrEditRecipeWrapper';
import Plan from './components/Plan';
import Shopping from './components/Shopping';
import Layout from './components/Layout';
import NoMatch from './components/NoMatch';
import PrivateRoute from './components/PrivateRoute';

const styles = {
  ...globalStyles,
  '@keyframes spinning': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
  icon: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'spinning 1s linear infinite',
  },
  iconLarge: {
    fontSize: '3rem',
  }
}

class App extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool,
      isSubmitting: PropTypes.bool,
      newUser: PropTypes.bool,
      user: PropTypes.objectOf(PropTypes.string),
      error: PropTypes.string,
    }).isRequired,
  }

  renderedRoute = () => {
    const { auth } = this.props;

    return (
      <Switch>
        <PrivateRoute isAuthenticated={auth.isAuthenticated} exact path="/" component={NextMeal} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/recipes" component={AllRecipes} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/add-recipe" component={AddOrEditRecipeWrapper} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/recipe/edit/:id" component={AddOrEditRecipeWrapper} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/recipe/view/:id" component={ViewRecipe} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/plan" component={Plan} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/shopping" component={Shopping} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} path="/login" component={SignIn} />
        <PrivateRoute isAuthenticated={auth.isAuthenticated} component={NoMatch} />
      </Switch>
    )
  }

  render() {
    const { app, classes } = this.props;
    return (
      <MuiThemeProvider theme={THEME}>
        <CssBaseline />
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Layout>
              {this.renderedRoute()}
            </Layout>
            <Modal disableAutoFocus open={app.loading}>
              <div className={classes.icon}>
                <Cached fontSize="large" classes={{ fontSizeLarge: classes.iconLarge }} color="primary" />
              </div>
            </Modal>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
})

export default connect(
  mapStateToProps,
)(withStyles(styles)(App));
