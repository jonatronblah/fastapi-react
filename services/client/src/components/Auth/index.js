import React from 'react';
import axios from 'axios';

import './style.css';


const qs = require('query-string');

export function Authorize() {
    const requestBody = {
        "username": "jonatron",
        "password": "secret"
    }
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    axios.post('/token', qs.stringify(requestBody), config)
      .then(res => {
          localStorage.setItem('token', res.data.access_token)
        })
      .then(function (response) {
        console.log(response)
      })	
      .catch(error => {
      console.log("ERRRR:: ",error.response.data)
      })



}

export default Authorize;
