'use client'
import { useRouter } from "next/navigation";
import styles from './signin.module.css'
import db from '../db/firebase/db'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { UserState } from "../context/context";
function Singin() {
    const router =useRouter()
    const auth = getAuth();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [viewPassword,setViewPassword]=useState(false)
    const {user,setUser}=UserState()

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(email!==''||password!==''){
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setUser(user)
            router.push('/User')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
          });
        }else{
          alert('email or password can not be empty')
        }
 
    }
 
  return (
    <div>
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit}>
          <input className={styles.inputBar} type='text' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
          <br/>
          {viewPassword==true?
          <input className={styles.inputBar} type='text' placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>:
          
          <input className={styles.inputBar} type='password' placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>}
          <button type="button" onClick={()=>{
            
            setViewPassword(!viewPassword)}
            }>View Password</button>
          
          <br/>
          <button className={styles.btn} type="submit">click</button>
        </form>
    </div>
  )
}

export default Singin