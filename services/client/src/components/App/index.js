import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './style.css';

import Router from '../Router'

export function App() {

  return(
    <BrowserRouter>
      <Router />  
    </BrowserRouter>
  );  	
}

export default App;