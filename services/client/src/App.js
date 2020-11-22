import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List } from 'antd';
import {
  Switch,
  Route
} from "react-router-dom";

  
export function App(props) {
 
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
	  axios.post('/message', 
	  {
                "username": "mayor defacto",
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
  setBody("");
  setSubject("");
  
  
  }

  const [gotData, setData] = useState([]);  
  useEffect(() => {
  const interval = setInterval(() => {	  
    
	axios.get('/message').then(res => {
      setData(res.data.data[0].reverse());
    });
	}, 1000)
	return()=>clearInterval(interval)
	
	
	}, [])

	
	
	
	
	
   
  
  
  return (
    <div className="App">
		<header className="App-header"> 
			<Switch>
			<Route path="/data">
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
			</Switch>		  
		</header>
    </div>
	
  );
}

export default App;
