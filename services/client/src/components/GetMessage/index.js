import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query'

import './style.css';

export function GetMessage() {
  
  async function callApi() {
    const { data } = await axios.get('/message', {
      headers: {
        'Authorization': "Bearer " + token
            }
          }).then(res => {
            res.data.data[0].reverse();
          })
    
  }

  const [intervalMs, setIntervalMs] = React.useState(1000)
  const [value, setValue] = React.useState('')

  const { status, data, error, isFetching } = useQuery(
    'todos',
    callApi(),
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    }
  )





  

  return(
     


  ); 	
		
}

export default GetMessage;
