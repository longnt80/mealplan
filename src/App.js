import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Cached from '@material-ui/icons/Cached';

import Root from './components/Root';
import Router from './components/Router';
import Navbar from './components/Navbar';
import Layout from './components/Layout';

import firebase from './config/fbConfig';

const styles = {
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

  state = {
    authUser: JSON.parse(localStorage.getItem('authUser')),
  }

  // This is to prevent setState to run inside componentDidMount in case
  //this component is un-mounted before onAuthStateChanged return its result
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(authUser => {
      if (this._isMounted) {
        if (authUser) {
          const { email } = authUser;
          localStorage.setItem('authUser', JSON.stringify({ email, }));
          this.setState({
            authUser: { email },
          })
        } else {
          localStorage.removeItem('authUser');
          this.setState({
            authUser,
          })
        }
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { app, classes } = this.props;
    const { authUser } = this.state;
    const isAuthenticated = authUser !== null ? true : false;

    return (
      <Root>
        <div className="App">
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
})

export default connect(
  mapStateToProps,
)(withStyles(styles)(App));
