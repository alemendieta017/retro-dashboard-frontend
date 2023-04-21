import React, { useContext, useState } from 'react'
import PostsContext from '../Context/PostContext'
import styles from './InputCard.module.css'
import API_URL from '../config/config'

const InputCard = (props) => {
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
      body: JSON.stringify({ content: input, category: props.category }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const newPosts = { ...posts }
        newPosts[data.category].push(data)
        setPosts(newPosts)
        props.setToggleInputCard(!props.toggleInputCard)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function autoResize() {
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  React.useEffect(() => {
    autoResize()
  }, [input])

  return (
    <div className={styles['input-card']}>
      <form action="#" onSubmit={handleSubmit}>
        <textarea name="content" ref={textareaRef} onChange={handleChange} />
        <div>
          <span
            className="material-symbols-outlined"
            onClick={() => {
              props.setToggleInputCard(!props.toggleInputCard)
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
