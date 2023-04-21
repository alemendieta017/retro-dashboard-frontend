import React, { useContext } from 'react'
import Header from '../components/Header'
import styles from './Home.module.css'
import Column from '../components/Column'
import PostsContext from '../Context/PostContext'

const Home = () => {
  const { posts } = useContext(PostsContext)
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Column posts={posts} category="wentWell" />
        <Column posts={posts} category="toImprove" />
        <Column posts={posts} category="kudos" />
      </main>
    </>
  )
}

export default Home
