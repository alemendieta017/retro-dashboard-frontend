import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import PostsContext from './Context/PostContext'
import API_URL from './config/config'

function App() {
  const [posts, setPosts] = useState([])
  async function fetchPosts() {
    try {
      const response = await fetch(API_URL + '/posts')
      const data = await response.json()
      setPosts(data.posts)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      <Home />
    </PostsContext.Provider>
  )
}

export default App
