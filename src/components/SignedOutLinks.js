import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { navbarLinkStyles } from './SignedInLinks';

const SignedOutLinks = ({ classes }) => {
  return (
    <React.Fragment>
      <Link
        component={ RouterLink }
        className={[classes.item, classes.highlight].join(' ')}
        to="/signin"
        color="secondary"
        underline="none">
      Sign in
      </Link>
      <Link
        component={ RouterLink }
        className={[classes.item, classes.highlight].join(' ')}
        to="/signup"
        color="secondary"
        underline="none">
      Sign up
      </Link>
    </React.Fragment>
  );
};

export default withStyles(navbarLinkStyles)(SignedOutLinks);
