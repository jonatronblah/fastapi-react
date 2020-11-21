import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Switch,
  Route
} from "react-router-dom";

  
export function App(props) {
 
  const [username, setUsername] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
	  axios.post('/message', 
	  {
                "username": username,
                "subject": subject,
                "body": body,
                "datetime": Date.now(),
            }
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  
  }

  const [gotData, setData] = useState([]);  
  useEffect(() => {
  const interval = setInterval(() => {	  
    
	axios.get('/message').then(res => {
      setData(res.data.data[0]);
    });
	}, 1000)
	return()=>clearInterval(interval)
	
	
	}, [])

	
	
	
	
	
   
  
  
  return (
    <div className="App">
		<header className="App-header"> 
			<Switch>
			<Route path="/data">
       
			  <ul className="List">
				  {gotData.map((message) =>
				  <div key = {message.id}>
					  <h3>{message.subject}</h3>
					  <p>{message.body}</p>
					  <p>{message.datetime}</p>
				  </div>
				  )}	
			  </ul>       
			  <form onSubmit={handleSubmit}>
				<label>
				  Username:
				<input type="text" value={username} onChange={e => setUsername(e.target.value)} />
				<br/>
				</label>
				<label>
				  Subject:
				<input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
				<br/>
				</label>
				<label>
				  Body:
				<input type="text" value={body} onChange={e => setBody(e.target.value)} />
				<br/>
				</label>			
				<input type="submit" value="Submit" />
			  </form>
			</Route>
			</Switch>		  
		</header>
    </div>
	
  );
}

export default App;
