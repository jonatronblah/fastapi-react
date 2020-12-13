import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";

import './style.css';

const qs = require('query-string');

export function SignIn() {
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  
  

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const requestBody = {
      "username": username,
      "password": password
  }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  
  axios.post('/token', qs.stringify(requestBody), config)
      .then(res => {
        localStorage.setItem('token', res.data.access_token)
      }).then(res => {setSubmitted(true)})
      .then(res => {history.go(0)});
          
  setUsername("");
  setPassword("");
  
  
      }

      if (submitted) {
        return <Redirect push to={{
          pathname: '/'
        }}
        />
      } 
  return(
    <form onSubmit={handleSubmit}>
     
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        
      

      
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        
      

      
        <input type="submit" value="Submit" />
      
    </form>
  ); 	
		
}

export default SignIn;
