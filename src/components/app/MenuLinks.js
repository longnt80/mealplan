/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { objectOf, string, func, any } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import * as appActions from './actions/appActions';

export const navbarLinkStyles = theme => ({
  [theme.breakpoints.up('md')]: {
    item: {
      '&:not(:first-child)': {
        marginLeft: "10px"
      }
    },
  },
  highlight: {
    color: theme.palette.secondary.dark
  }
})

const PATHS = [
  {name: "Home", to: '/'},
  {name: "Recipes", to: '/recipes'},
  {name: "Plan", to: '/plan'},
  {name: "Shopping", to: '/shopping'},
]

class SignedInLinks extends React.Component {
  static propTypes = {
    requestSignOut: func.isRequired,
    appStatus: objectOf(any).isRequired,
    classes: objectOf(string),
    toggleMenuState: func,
  }

  static defaultProps = {
    classes: {},
    toggleMenuState: () => {},
  }

  renderRouterLinks = () => {
    const { classes, toggleMenuState } = this.props;
    return PATHS.map(path => (
      <Link
        onClick={toggleMenuState}
        key={path.name}
        component={RouterLink}
        className={classes.item}
        to={path.to}
        color="inherit"
        underline="none"
      >
        {path.name}
      </Link>
    ));
  }

  renderAuthLinks = () => {
    const { appStatus, classes, toggleMenuState } = this.props;
    if (appStatus.isAuthenticated) {
      return (
        <Link
          onClick={this.handleSignOutClick}
          className={[classes.item, classes.highlight].join(' ')}
          href="#"
          color="secondary"
          underline="none"
        >
        Sign out
        </Link>
      )
    }
      return (
        <>
          <Link
            onClick={toggleMenuState}
            component={RouterLink}
            className={[classes.item, classes.highlight].join(' ')}
            to="/login"
            color="secondary"
            underline="none"
          >
          Sign in
          </Link>
          <Link
            onClick={toggleMenuState}
            component={RouterLink}
            className={[classes.item, classes.highlight].join(' ')}
            to="/login"
            color="secondary"
            underline="none"
          >
          Sign up
          </Link>
        </>
      )

  }

  handleSignOutClick = () => {
    const { toggleMenuState, requestSignOut } = this.props;

    requestSignOut();
    toggleMenuState();
  }

  render() {
    return (
      <React.Fragment>
        {this.renderRouterLinks()}
        {this.renderAuthLinks()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  appStatus: state.appStatus,
})

const mapDispatchToProps = dispatch => {
  const { requestSignOut } = appActions;

  return ({
    requestSignOut: () => dispatch(requestSignOut()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(navbarLinkStyles)(SignedInLinks));
