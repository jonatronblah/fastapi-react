import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

import './style.css';

import PrivateRoute from '../ProtectedRoute';
import Test from '../Test';
import AltTest from '../AltTest';
import SignIn from '../SignIn';
import SignOut from '../SignOut';

import { ProvideAuth } from '../AuthContext';

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/login",
    sidebar: () => <div>sign in!</div>,
    main: () => <SignIn />
  },
  {
    path: "/alttest",
    sidebar: () => <div>alttest!</div>,
    main: () => <AltTest />
  }
];

const proutes = [
  {
    path: "/test",
    exact: true,
    sidebar: () => <div>test!</div>,
    main: () => <Test />
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
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/logout">Sign Out</Link>
        </li>
        <li>
          <Link to="/alttest">AltTest</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
      </ul>
      
      <Switch>
        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.sidebar />}
          />
        ))}
        {proutes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
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
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.main />}
          />
        ))}
        {proutes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
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