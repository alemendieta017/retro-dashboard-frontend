import React, { useState } from 'react'
import styles from './Column.module.css'
import Card from './Card'
import InputCard from './InputCard'
import { BlockPicker } from 'react-color'

const Column = ({ category, posts, color, setColor }) => {
  const [toggleInputCard, setToggleInputCard] = useState(false)
  const [colorPicker, setColorPicker] = useState(false)

  const title =
    category === 'wentWell'
      ? 'Went Well'
      : category === 'toImprove'
      ? 'To Improve'
      : 'Action Items'

  const handleAddClick = () => {
    setToggleInputCard(toggleInputCard ? false : true)
  }

  const toggleColorPicker = () => {
    setColorPicker(colorPicker ? false : true)
  }

  return (
    <div className={styles.column}>
      <div className={styles['column-header']}>
        <div className={styles['colorPicker-container']}>
          <h2>{title}</h2>
          <div
            className={styles.colorPicker}
            style={{ backgroundColor: color }}
            onClick={toggleColorPicker}
          >
            {colorPicker && <BlockPicker className={styles.colorPickerBlock} />}
          </div>
        </div>
        <div
          className={styles.addButton}
          onClick={handleAddClick}
          style={{ backgroundColor: color }}
        >
          <span className="material-symbols-outlined">add</span>
        </div>
      </div>
      {toggleInputCard && (
        <InputCard
          category={category}
          toggleInputCard={toggleInputCard}
          setToggleInputCard={setToggleInputCard}
          color={color}
        />
      )}
      {posts[category]?.map((post, index) => (
        <Card
          key={`${category}-${index}`}
          content={post.content}
          id={post._id}
          likes={post.likes}
          color={color}
        />
      ))}
    </div>
  )
}

export default Column
