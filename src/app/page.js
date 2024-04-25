'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Singin from './components/Singin'



export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.contain}>
      <Singin/>
      </div>
    </main>
  )
}
