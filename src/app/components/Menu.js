'use client'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserState } from "../context/context";
import styles from './Menu.module.css'
function Menu({opetions}) {
    const router=useRouter()
    const auth = getAuth();
    const {setUser}=UserState()
  return (
    <div>
        <ul className={styles.content}>
            <li onClick={()=>{opetions('image')}}>Image</li>
            <li onClick={()=>{opetions('audio')}}>Audio</li>
            <li onClick={()=>{opetions('files')}}>Files</li>
            <li onClick={()=>{signOut(auth).then(() => {
              setUser(null)
              console.log('loged out')
              router.push('/')
              }).catch((error) => {
              // An error happened.
              console.log(error)
              });}}
              >log out</li>
        </ul>
    </div>
  )
}

export default Menu