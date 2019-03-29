import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import THEME from '../common/theme';
import globalStyles from '../common/globalStyles';

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

export default withStyles(globalStyles)(Root);
