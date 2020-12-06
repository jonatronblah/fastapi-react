import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useQuery,
  useQueryCache,
  useMutation,
  QueryCache,
  ReactQueryCacheProvider,
} from 'react-query'

import './style.css';

import Authorize from '../Auth'

const queryCache = new QueryCache()


export function GetMessage() {
  Authorize()
  const token = localStorage.getItem('token')


  const cache = useQueryCache()
  const [intervalMs, setIntervalMs] = React.useState(1000)
  const [value, setValue] = React.useState('')

  const { status, data, error, isFetching } = useQuery(
    'messages',
    async () => {
      const { data } = await axios.get('/message', {
        headers: {
          'Authorization': "Bearer " + token
              }
            })
      return data
    },  


    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    }
  )





  

  return(
    <ReactQueryCacheProvider queryCache={queryCache}>
      <p>{JSON.stringify(data)}</p>
    </ReactQueryCacheProvider>   


  ); 	
		
}

export default GetMessage;
