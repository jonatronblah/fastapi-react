import React from 'react';
import { Route, Switch } from "react-router-dom";

import './style.css';

import ProtectedRoute from '../ProtectedRoute';
import GetMessage from '../GetMessage';
import Test from '../Test';
import AltTest from '../AltTest';

import LoggedIn from '../LoggedIn';

export function Router() {

  return(
    <Switch>
      <Route path="/msg" component={GetMessage} />
      <ProtectedRoute path="/test" component={Test} />
      <Route path="/alttest" component={AltTest} />
      <Route path="/data" component={LoggedIn} />
    </Switch>  


  );  	
}

export default Router;