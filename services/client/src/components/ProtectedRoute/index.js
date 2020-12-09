import React from 'react';
import { Route, Redirect } from "react-router-dom";

import './style.css';

import { useAuth } from '../AuthContext'


export function PrivateRoute({ children, ...rest }) 
{
  let auth = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/alttest",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;