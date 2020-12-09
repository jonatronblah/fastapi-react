import React from 'react';
import { Route, Switch } from "react-router-dom";

import './style.css';

import PrivateRoute from '../ProtectedRoute';
import GetMessage from '../GetMessage';
import Test from '../Test';
import AltTest from '../AltTest';

import { ProvideAuth } from '../AuthContext'

export function Router() {

  return(
    <ProvideAuth>
    <Switch>
      <Route path="/msg" component={GetMessage} />
      <PrivateRoute path="/test">
              <Test />
            </PrivateRoute>
      <Route path="/alttest" component={AltTest} />
    </Switch>  
    </ProvideAuth>

  );  	
}

export default Router;