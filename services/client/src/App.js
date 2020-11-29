import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List } from 'antd';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const qs = require('query-string');

  export const fakeAuth = {
	  signedIn: false
	};

export function App(props) {



	const RequireAuth = ({ children }) => {
	  if (!fakeAuth.signedIn) {
		return <Redirect to={'/login'} />;
	  }

	  return children;
	};


  // handle message form submission 
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
	  const token = localStorage.getItem('token');
	  axios.post('/message', 
	  {
                "username": "mayor defacto",
                "subject": subject,
                "body": body,
                "datetime": Date.now(),
            },
		{
  headers: {
    'Authorization': "Bearer " + token
			  }
			}	
  )
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  setBody("");
  setSubject("");  
  }
  
  // handle login form and jwt  
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (evt) => {
      evt.preventDefault();
const requestBody = {
  "username": username,
  "password": password
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

axios.post('/token', qs.stringify(requestBody), config)
  .then(res => {
	  localStorage.setItem('token', res.data.access_token);
      setJwt(res.data.access_token);
    })
  .then(function (response) {
    console.log(response);
  })	
  .catch(error => {
console.log("ERRRR:: ",error.response.data);
  });
  setUsername("");
  setPassword("");  
  }  
  
  
  
  
  // handle message retreival on feed
  const [gotData, setData] = useState([]); 
  const token = localStorage.getItem('token');  
  useEffect(() => {
  const interval = setInterval(() => {	  
    
	axios.get('/message', {
  headers: {
    'Authorization': "Bearer " + token
			  }
			}).then(res => {
      setData(res.data.data[0].reverse());
    });
	}, 10000)
	return()=>clearInterval(interval)
	
	
	}, [])

	
	
	
	
	
   
  
  
  return (
    <div className="App">
		<header className="App-header"> 
			<Switch>
			<RequireAuth>
			<Route exact path="/feed">
			  <form className="Form" onSubmit={handleSubmit}>
				<label>
				  Subject:
				<input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
				<br/>
				</label>
				<label>
				  Body:
				<textarea value={body} onChange={e => setBody(e.target.value)} />
				<br/>
				</label>			
				<input type="submit" value="Submit" />
			  </form>
			  <List className="List"
				itemLayout="horizontal"
				dataSource={gotData}
				renderItem={item => (
				  <li>
					<Card
					  size="small"
					  title={item.subject}
					>
					<p>{item.body}</p>
					<p><i>{item.username}</i></p>
					<p>{new Date(item.datetime).toLocaleString()}</p>
					</Card>
				  </li>
				)}
			  />       
			</Route>
			</RequireAuth>
			<Route exact path="/login">
			  <form className="LoginForm" onSubmit={handleLogin}>
				<label>
				  username:
				<input type="text" value={username} onChange={e => setUsername(e.target.value)} />
				<br/>
				</label>
				<label>
				  password:
				<input type="text" value={password} onChange={e => setPassword(e.target.value)} />
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
