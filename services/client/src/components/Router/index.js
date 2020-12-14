import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

import './style.css';

import PrivateRoute from '../ProtectedRoute';
import SignIn from '../SignIn';
import SignOut from '../SignOut';
import Register from '../Register'
import Feed from '../Feed'

import { ProvideAuth } from '../AuthContext';

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/register",
    sidebar: () => <div>register!</div>,
    main: () => <Register />
  },
  {
    path: "/login",
    sidebar: () => <div>sign in!</div>,
    main: () => <SignIn />
  }
];

const proutes = [
  {
    path: "/feed",
    exact: true,
    sidebar: () => <div>feed!</div>,
    main: () => <Feed />
  },
  {
    path: "/logout",
    exact: true,
    sidebar: () => <div>sign out!</div>,
    main: () => <SignOut />
  }
];






export function Router() {

  return(
<ProvideAuth>
    <div style={{ display: "flex" }}>
    <div
      style={{
        padding: "10px",
        width: "40%",
        background: "#f0f0f0"
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/feed">Feed</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/logout">Sign Out</Link>
        </li>
      </ul>
      
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.sidebar />}
          />
        ))}
        {proutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.sidebar />}
          />
        ))}


      </Switch>
    </div>

    <div style={{ flex: 1, padding: "10px" }}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
        {proutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}        
      </Switch>
      
    </div>

  </div>
</ProvideAuth>



  );  	
}

export default Router;



/*

    <ProvideAuth>
    <Switch>
      <Route path="/login" component={SignIn} />
      <PrivateRoute path="/test">
              <Test />
            </PrivateRoute>
      <Route path="/alttest" component={AltTest} />
    </Switch>  
    </ProvideAuth>

*/