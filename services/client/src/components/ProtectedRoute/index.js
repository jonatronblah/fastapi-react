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
        ) : auth.loading ? (
          <div>LOADING...</div>
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;