import React from 'react';
import { Route, Switch } from "react-router-dom";

import './style.css';

import PrivateRoute from '../ProtectedRoute';
import Test from '../Test';
import AltTest from '../AltTest';
import SignIn from '../SignIn'

import { ProvideAuth } from '../AuthContext'

export function Router() {

  return(
    <ProvideAuth>
    <Switch>
      <Route path="/login" component={SignIn} />
      <PrivateRoute path="/test">
              <Test />
            </PrivateRoute>
      <Route path="/alttest" component={AltTest} />
    </Switch>  
    </ProvideAuth>

  );  	
}

export default Router;