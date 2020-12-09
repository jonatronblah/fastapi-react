import React, { useState } from 'react';
import axios from 'axios';
import {
  useQuery
} from 'react-query'

import './style.css';




export function LoggedIn() {
  const token = localStorage.getItem('token')
  


  const [Log, setLog] = useState(false)

  const { status, data, error, isFetching } = useQuery(
    'loggedin',
    async () => {
      const { data, status } = await axios.get('/token/me', {
        headers: {
          'Authorization': "Bearer " + token
              }
            })
    return status        
      
      
    }  
  )




  

  return(
    <p>{JSON.stringify(data)}</p>


  ); 	
		
}

export default LoggedIn;
