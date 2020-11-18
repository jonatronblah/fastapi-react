import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Switch,
  Route
} from "react-router-dom";

  
export function App(props) {
 
  const [name, setName] = useState("");
  const handleSubmit = (evt) => {
      evt.preventDefault();
	  axios.post('/student', 
	  {
                "fullname": name,
                "email": "jdoe@x.edu.ng",
                "course_of_study": "Water resources engineering",
                "year": 2,
                "gpa": "3.0",
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
	if (gotData) {  
    axios.get('/student').then(res => {
      setData(res.data.data[0]);
    });
	}
  }, [gotData])
   
  
  
  return (
    <div className="App">
		<header className="App-header"> 
			<Switch>
			<Route path="/data">
       
			  <ul>
			  {gotData.map(student=><li key = {student.id}>{student.fullname}</li>)}
			  </ul>       
			  <form onSubmit={handleSubmit}>
				<label>
				  Name:
				<input type="text" value={name} onChange={e => setName(e.target.value)} />
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
