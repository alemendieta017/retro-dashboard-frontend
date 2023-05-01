import React, { useContext, useState, useEffect } from 'react'
import PostsContext from '../Context/PostContext'
import styles from './InputCard.module.css'
import API_URL from '../config/config'

const InputCard = ({
  category,
  toggleInputCard,
  setToggleInputCard,
  color,
}) => {
  const [input, setInput] = useState('')
  const textareaRef = React.useRef(null)
  const { posts, setPosts } = useContext(PostsContext)

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(API_URL + '/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: input, category: category }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category].push(data)
        setPosts(newPosts)
        setToggleInputCard(!toggleInputCard)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    function autoResize() {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    autoResize()
  }, [input])

  return (
    <div className={styles['input-card']} style={{ backgroundColor: color }}>
      <form action="#" onSubmit={handleSubmit}>
        <textarea name="content" ref={textareaRef} onChange={handleChange} />
        <div>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              setToggleInputCard(!toggleInputCard)
            }}
          >
            close
          </span>
          <input type="submit" value="Add"></input>
        </div>
      </form>
    </div>
  )
}

export default InputCard
