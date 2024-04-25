'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Singin from './components/Singin'



export default function Home() {
console.log(process.env.NEXT_PUBLIC_apiKey)
  return (
    <main className={styles.main}>
      <div className={styles.contain}>
      <Singin/>
      </div>
    </main>
  )
}
