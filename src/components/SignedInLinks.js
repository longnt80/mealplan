import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { signOut } from '../store/actions/authActions';

export const navbarLinkStyles = theme => ({
  item: {
    '&:not(:first-child)': {
      marginLeft: "10px"
    }
  },
  highlight: {
    color: theme.palette.secondary.dark
  }
})

const SignedInLinks = ({ classes, signingOut }) => {
  return (
    <React.Fragment>
      <Link
        component={RouterLink}
        className={classes.item}
        to="/"
        color="inherit"
        underline="none"
      >
      Home
      </Link>
      <Link
        component={RouterLink}
        className={classes.item}
        to="/recipes"
        color="inherit"
        underline="none"
      >
      Recipes
      </Link>
      <Link
        component={RouterLink}
        className={classes.item}
        to="/plan"
        color="inherit"
        underline="none"
      >
      Plan
      </Link>
      <Link
        component={RouterLink}
        className={classes.item}
        to="/shopping"
        color="inherit"
        underline="none"
      >
      Shopping
      </Link>
      <Link
        onClick={signingOut}
        component={RouterLink}
        className={[classes.item, classes.highlight].join(' ')}
        to="/"
        color="secondary"
        underline="none"
      >
      Sign out
      </Link>
    </React.Fragment>
  );
};

SignedInLinks.propTypes = {
  signingOut: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => ({
  signingOut: () => dispatch(signOut()),
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(navbarLinkStyles)(SignedInLinks));
