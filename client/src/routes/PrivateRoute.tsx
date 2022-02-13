/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getLoggedIn } from '../store/users';
import { IPrivateRoute } from '../types/interfaces/IPrivateRoute';

function PrivateRoute({ component: Component, children, ...rest }: IPrivateRoute) {
  const isLoggedIn = useSelector(getLoggedIn());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect to={{
              pathname: '/authorization',
              state: { from: props.location },
            }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
}

export default PrivateRoute;
