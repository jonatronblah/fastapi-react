import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Comment, List } from 'antd';
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
  setUsername("");
  
  
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
			  <List
				className="List"
				itemLayout="horizontal"
				dataSource={gotData}
				renderItem={item => (
				  <li>
					<Comment
					  author={item.username}
					  content={item.body}
					  datetime={item.datetime}
					/>
				  </li>
				)}
			  />       
			  <form onSubmit={handleSubmit}>
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
