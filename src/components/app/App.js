/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { func, objectOf, any, string } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Root from './Root';
import Router from './Router';
import Navbar from './Navbar';
import Layout from './Layout';
import firebase from '../../config/fbConfig';
import * as appActions from './actions/appActions';

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
    appStatus: objectOf(any),
    classes: objectOf(string),
    fbAuthObserverTriggered: func,
  }

  static defaultProps = {
    appStatus: {},
    classes: {},
    fbAuthObserverTriggered: () => {},
  }


  // This is to stop the callback of onAuthStateChanged to run in case
  // this component is un-mounted before onAuthStateChanged return its result
  _isMounted = false;

  componentDidMount() {
    const { fbAuthObserverTriggered } = this.props;
    this._isMounted = true;
    firebase.auth().onAuthStateChanged(authUser => {
      if (!this._isMounted) return;

      if (authUser) {
        window.localStorage.setItem('mp_authUser', JSON.stringify(authUser));
        fbAuthObserverTriggered(true, authUser);
      } else {
        window.localStorage.removeItem('mp_authUser');
        fbAuthObserverTriggered(false, null);
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { appStatus, classes } = this.props;
    const { isAuthenticated } = appStatus;

    return (
      <Root>
        <div className={classes.root}>
          <Navbar isAuthenticated={isAuthenticated} />
          <Layout>
            <Router isAuthenticated={isAuthenticated} />
          </Layout>
        </div>
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  appStatus: state.appStatus,
});

const mapDispatchToProps = dispatch => {
  const { fbAuthObserverTriggered } = appActions;

  return ({
    fbAuthObserverTriggered: (isAuthenticated, authUser) => dispatch(fbAuthObserverTriggered(isAuthenticated, authUser)),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
