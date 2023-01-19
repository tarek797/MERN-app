import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const server = 'http://127.0.0.1:3000'
  const [posts, setposts] = useState([])

  useEffect(() => {
    axios.get(server)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  },[0])
  return (
    <div className="App">
     <h1>posts</h1>
     <ul>
      {
        posts.map(post => <li key={post.id}>{post.API}</li>)
      }
     </ul>
    </div>
  )
}

export default App
