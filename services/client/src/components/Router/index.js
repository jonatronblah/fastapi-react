import React from 'react';
import { Route, Switch } from "react-router-dom";

import './style.css';

import GetMessage from '../GetMessage';
import LoggedIn from '../LoggedIn';

export function Router() {

  return(
    <Switch>
      <Route path="/msg" component={GetMessage} />
      <Route path="/me" component={LoggedIn} />

    </Switch>  


  );  	
}

export default Router;