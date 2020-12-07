import React from 'react';
import axios from 'axios';

import './style.css';



export function LoggedIn() {
  const token = localStorage.getItem('token');	 
  
  async () => {
    const { data } = await axios.get('/token/me', {
      headers: {
        'Authorization': "Bearer " + token
            }
          })
    return data
    }
  return data  
//  if (data.data.code == 200) {
//    return true;
//} else {
//    return false;
//}



}

export default LoggedIn;
