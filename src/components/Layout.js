import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    padding: "20px 30px"
  }
}

const Layout = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      {children}
    </div>
  )
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
