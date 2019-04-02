/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Cached from '@material-ui/icons/Cached';

import Root from './components/Root';
import Router from './components/Router';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import * as authActions from './store/actions/authActions';
import firebase from './config/fbConfig';

const styles = {
  '@keyframes spinning': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  },
  root: {
    height: '100%',
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

  state = {
    authUser: JSON.parse(localStorage.getItem('mp_authUser')),
  }

  // This is to prevent setState in the callback of onAuthStateChanged to run in case
  // this component is un-mounted before onAuthStateChanged return its result
  _isMounted = false;

  componentDidMount() {
    const { signInSuccess, resetAuthState } = this.props;
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(authUser => {
      if (this._isMounted) {
        if (authUser) {
          const { email } = authUser;
          const user = {
            email,
          };
          window.localStorage.setItem('mp_authUser', JSON.stringify(user));
          this.setState({
            authUser: {...user}
          });
          signInSuccess(user);
        } else {
          window.localStorage.removeItem('mp_authUser');
          this.setState({
            authUser: null,
          })
          resetAuthState();
        }
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { authUser } = this.state;
    const { app, classes } = this.props;
    const isAuthenticated = authUser !== null;

    return (
      <Root>
        <div className={classes.root}>
          <Navbar isAuthenticated={isAuthenticated} />
          <Layout>
            <Router isAuthenticated={isAuthenticated} />
          </Layout>
          <Modal disableAutoFocus open={app.loading}>
            <div className={classes.icon}>
              <Cached fontSize="large" classes={{ fontSizeLarge: classes.iconLarge }} color="primary" />
            </div>
          </Modal>
        </div>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => {
  const { signInSuccess, resetAuthState } = authActions;

  return ({
    signInSuccess: user => dispatch(signInSuccess(user)),
    resetAuthState: () => dispatch(resetAuthState()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
