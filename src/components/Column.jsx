import React, { useState } from 'react'
import styles from './Column.module.css'
import Card from './Card'
import InputCard from './InputCard'

const Column = (props) => {
  const [toggleInputCard, setToggleInputCard] = useState(false)

  const title =
    props.category === 'wentWell'
      ? 'Went Well'
      : props.category === 'toImprove'
      ? 'To Improve'
      : 'Action Items'

  const handleAddClick = () => {
    setToggleInputCard(toggleInputCard ? false : true)
  }

  return (
    <div className={styles.column}>
      <div className={styles['column-header']}>
        <h2>{title}</h2>
        <div className={styles.addButton} onClick={handleAddClick}>
          <span className="material-symbols-outlined">add</span>
        </div>
      </div>
      {toggleInputCard && (
        <InputCard
          category={props.category}
          toggleInputCard={toggleInputCard}
          setToggleInputCard={setToggleInputCard}
        />
      )}
      {props.posts[props.category]?.map((post, index) => (
        <Card
          key={`${props.category}-${index}`}
          content={post.content}
          id={post._id}
        />
      ))}
    </div>
  )
}

export default Column
