import { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';




export function useProvideAuth() {
  
const [user, setUser] = useState([]);





const token = localStorage.getItem('token');

useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get('/token/me', {
      headers: {
        'Authorization': "Bearer " + token
            }
          });

    setUser(result.data);
  };

  fetchData();
}, []);









return {user}
   
    

	
		
}

export default useProvideAuth;
