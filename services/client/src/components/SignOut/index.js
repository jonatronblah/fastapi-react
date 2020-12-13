import React, { useState } from 'react';
import { Redirect, useHistory  } from "react-router-dom";

import './style.css';

export function SignOut() {
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false);

  
  

  const handleSubmit = (evt) => {
    evt.preventDefault();

        localStorage.removeItem('token');
        setSubmitted(true);
        history.go(0);
      }

      if (submitted) {
        return <Redirect push to={{
          pathname: '/'
        }}
        />
      } 
  return(
    <form onSubmit={handleSubmit}>
     
 
        <input type="submit" value="Submit" />
      
    </form>
  ); 	
		
}

export default SignOut;
