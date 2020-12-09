import React from 'react';
import { Route, Redirect } from "react-router-dom";

import './style.css';

import LoggedIn from '../LoggedIn';

export function PrivateRoute({ component: Component, ...rest }) 
{
  let fakeAuth = LoggedIn()
  return (
    <Route
      {...rest}
      render={props =>
        (fakeAuth.code == 200) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/msg",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;