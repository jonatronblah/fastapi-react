import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List } from 'antd';

import './style.css';

export function Feed() {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/token/me', {
        headers: {
          'Authorization': "Bearer " + token
              }
            });
      
      setUsername(JSON.stringify(result.data.username));
        
      
      
      
    };
  
    fetchData();
  }, []);
  
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

  const [gotData, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');	  
    const interval = setInterval(() => {	  
      
    axios.get('/message', {
    headers: {
      'Authorization': "Bearer " + token
          }
        }).then(res => {
        setData(res.data.data[0].reverse());
      });
    }, 1000)
    return()=>clearInterval(interval)
    
    
    }, [setData])



  return(
    <div>
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
</div>

  ); 	
		
}

export default Feed;
