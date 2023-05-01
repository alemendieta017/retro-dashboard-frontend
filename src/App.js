import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import PostsContext from './Context/PostContext'
import API_URL from './config/config'
import { socket } from './socket'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL + '/posts')
        const data = await response.json()
        setPosts(data.posts)
      } catch (err) {
        console.log(err)
      }
    }
    socket.on('connect', () => {
      console.log('connected websocket client')
    })

    function handleNewPost(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.category]: [...prevPosts[data.category], data],
        }
      })
    }

    function handleDeletePost(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.category]: prevPosts[data.category].filter(
            (post) => post._id !== data._id
          ),
        }
      })
    }

    function handleUpdatePost(data) {
      setPosts((prevPosts) => {
        return {
          ...prevPosts,
          [data.category]: prevPosts[data.category].map((post) => {
            if (post._id === data._id) {
              return data
            }
            return post
          }),
        }
      })
    }

    socket.on('newPost', handleNewPost)
    socket.on('deletePost', handleDeletePost)
    socket.on('updatePost', handleUpdatePost)

    fetchPosts()

    return () => {
      socket.off('connect')
      socket.off('newPost')
    }
  }, [])

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      <Home />
    </PostsContext.Provider>
  )
}

export default App
