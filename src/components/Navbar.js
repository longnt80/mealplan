import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import SignedInLinks from './SignedInLinks';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const Navbar = ({ classes, auth, isAuthenticated }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              MealPlan
            </Link>
          </Typography>
          <div>
            {isAuthenticated && <SignedInLinks />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    newUser: PropTypes.bool,
    user: PropTypes.objectOf(PropTypes.string),
    error: PropTypes.string,
  }).isRequired,
};

export default connect(
  state => ({ auth: state.auth })
)(withStyles(styles)(Navbar));
