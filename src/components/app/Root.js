/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { node } from 'prop-types';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import THEME from '../../common/theme';
import globalStyles from '../../common/globalStyles';

const Root = ({ children }) => {
  return (
    <MuiThemeProvider theme={THEME}>
      <CssBaseline />
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

Root.propTypes = {
  children: node.isRequired,
}

export default withStyles(globalStyles)(Root);
