import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";

import './style.css';



export function Register() {
  const history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    
  
  axios.post('/user',  
            {
              "username": username,
              "hashed_password": password,
              "email": email
          }
  ).then(res => {setSubmitted(true)})
    .then(res => {history.go(0)});
          
  
  
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
        
      

      
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      

      
        <input type="submit" value="Submit" />
      
    </form>
  ); 	
		
}

export default Register;
