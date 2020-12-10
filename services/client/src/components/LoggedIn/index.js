import { useState, useEffect } from 'react';
import axios from 'axios';

import './style.css';




export function useProvideAuth() {
  
const [user, setUser] = useState(false);
const [loading, setLoading] = useState(true)




const token = localStorage.getItem('token');


useEffect(() => {
  axios.get('/token/me', {
    headers: {
      'Authorization': "Bearer " + token
          }
        }).then(res => {(res.status === 200) ? setUser(true): setUser(false)})
        .catch(error => {setLoading(false)});



}, [setUser]);

/*
useEffect(() => {
  const fetchData = async () => {
    const result = await axios.get('/token/me', {
      headers: {
        'Authorization': "Bearer " + token
            }
          });
    if (result.status === 200){
      setUser(true);
    } 
    setLoading(false);  
    
    
    
  };

  fetchData();
}, [setUser]);
*/




  




return {
  user,
  loading
}
   
    

	
		
}

export default useProvideAuth;
