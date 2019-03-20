/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, path, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ?
            path !== "/login" ?
              (<Component {...props} />)
              : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { isAuthenticated }
                  }}
                />
              )
              : path !== "/login" ?
                (
                  <Redirect
                    to={{
                    pathname: "/login",
                    state: { isAuthenticated }
                  }}
                  />
                )
                : (<Component {...props} />)
      }}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string,
}

PrivateRoute.defaultProps = {
  path: null,
}

export default PrivateRoute;
