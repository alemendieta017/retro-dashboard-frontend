import React from 'react'
import styles from './Card.module.css'

const Card = (props) => {
  return (
    <div className={styles.card}>
      <p>{props.content}</p>
      <div className={styles.cardButtons}>
        <span className="material-symbols-outlined">edit</span>
        <div>
          <span className="material-symbols-outlined">favorite</span>
          <span>0</span>
          <span className="material-symbols-outlined">comment</span>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

export default Card
