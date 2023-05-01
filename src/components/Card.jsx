import React, { useContext, useState } from 'react'
import styles from './Card.module.css'
import API_URL from '../config/config'
import PostsContext from '../Context/PostContext'

const Card = ({ id, content, likes, color }) => {
  const { posts, setPosts } = useContext(PostsContext)
  const [editing, setEditing] = useState(false)
  const [liked, setLiked] = useState(false)

  const toggleEdit = () => {
    setEditing(editing ? false : true)
  }

  const handleDeleteClick = () => {
    fetch(API_URL + '/deletePost?postId=' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category] = newPosts[data.category].filter((post) => {
          return post._id !== data._id
        })
        setPosts(newPosts)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const payload = {
      content: e.target.contentTextArea.value,
    }

    fetch(API_URL + '/updatePost?postId=' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category] = newPosts[data.category].map((post) => {
          if (post._id === data._id) {
            return data
          } else {
            return post
          }
        })
        setPosts(newPosts)
        toggleEdit()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLike = () => {
    const payload = {
      likes: liked ? likes - 1 : likes + 1,
    }
    fetch(API_URL + '/updatePost?postId=' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category] = newPosts[data.category].map((post) => {
          if (post._id === data._id) {
            return data
          } else {
            return post
          }
        })
        setLiked(liked ? false : true)
        setPosts(newPosts)
      })
      .catch((e) => {
        console.log(e)
        setLiked(false)
      })
  }

  return (
    <div className={styles.card} style={{ backgroundColor: color }}>
      {editing ? (
        <form onSubmit={handleEditSubmit}>
          <textarea defaultValue={content} name="contentTextArea"></textarea>
          <input type="submit" value="Submit" />
          <button onClick={toggleEdit}>Cancel</button>
        </form>
      ) : (
        <p>{content}</p>
      )}
      <div className={styles['cardButtons-container']}>
        {!editing && (
          <span
            className={`material-symbols-outlined ${styles.cardButton}`}
            onClick={toggleEdit}
          >
            edit
          </span>
        )}
        <div>
          <span
            className={`material-symbols-outlined ${styles.cardButton}`}
            onClick={handleDeleteClick}
          >
            close
          </span>
          <span
            className={`material-symbols-outlined ${styles.cardButton} ${
              liked && styles.liked
            }`}
            onClick={handleLike}
          >
            favorite
          </span>
          <span>{likes}</span>
          <span className={`material-symbols-outlined ${styles.cardButton}`}>
            comment
          </span>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

export default Card
