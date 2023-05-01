import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import styles from './Home.module.css'
import Column from '../components/Column'
import PostsContext from '../Context/PostContext'

const Home = () => {
  const [wentWellColor, setWentWell] = useState('#44BBA4')
  const [toImproveColor, setToImprovecolor] = useState('#DA627D')
  const [kudosColor, setKudosColor] = useState('#4A8FE7')
  const { posts } = useContext(PostsContext)
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Column
          posts={posts}
          category="wentWell"
          color={wentWellColor}
          setColor={setWentWell}
        />
        <Column
          posts={posts}
          category="toImprove"
          color={toImproveColor}
          setColor={setToImprovecolor}
        />
        <Column
          posts={posts}
          category="kudos"
          color={kudosColor}
          setColor={setKudosColor}
        />
      </main>
    </>
  )
}

export default Home
