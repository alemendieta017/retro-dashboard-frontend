import React, { useContext } from 'react'
import styles from './Card.module.css'
import API_URL from '../config/config'
import PostsContext from '../Context/PostContext'

const Card = (props) => {
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

  return (
    <div className={styles.card}>
      <p>{props.content}</p>
      <div className={styles['cardButtons-container']}>
        <span className={`material-symbols-outlined ${styles.cardButton}`}>
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
