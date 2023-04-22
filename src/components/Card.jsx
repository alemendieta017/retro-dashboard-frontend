import React, { useContext, useState } from 'react'
import styles from './Card.module.css'
import API_URL from '../config/config'
import PostsContext from '../Context/PostContext'

const Card = (props) => {
  const [editing, setEditing] = useState(false)
  const { posts, setPosts } = useContext(PostsContext)

  const handleDeleteClick = () => {
    fetch(API_URL + '/deletePost?postId=' + props.id, {
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

  const handleEditClick = () => {
    setEditing(editing ? false : true)
  }

  return (
    <div className={styles.card}>
      {editing ? (
        <textarea value={props.content}></textarea>
      ) : (
        <p>{props.content}</p>
      )}
      <div className={styles['cardButtons-container']}>
        <span
          className={`material-symbols-outlined ${styles.cardButton}`}
          onClick={handleEditClick}
        >
          edit
        </span>
        <div>
          <span
            className={`material-symbols-outlined ${styles.cardButton}`}
            onClick={handleDeleteClick}
          >
            close
          </span>
          <span className={`material-symbols-outlined ${styles.cardButton}`}>
            favorite
          </span>
          <span>0</span>
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
