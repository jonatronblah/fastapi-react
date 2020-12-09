import { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';




export function useProvideAuth() {
  
const [user, setUser] = useState(false);
const [loading, setLoading] = useState(true)




const token = localStorage.getItem('token');

useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get('/token/me', {
      headers: {
        'Authorization': "Bearer " + token
            }
          });

    setUser(true);
    setLoading(false);
  };

  fetchData();
}, [setUser]);





  




return {
  user,
  loading
}
   
    

	
		
}

export default useProvideAuth;
