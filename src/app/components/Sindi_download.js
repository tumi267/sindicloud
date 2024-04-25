'use client'
import firebase from "@/app/db/firebase/db";
import { getStorage, ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from './download.module.css'
function Sindi_download() {
    // Create a reference to the file we want to download
    const storage = getStorage();
    const listRef=(ref(storage, 'image/'))
    const [imagelist,setImageList]=useState([])
    useEffect(()=>{
        const getlist=async()=>{
            const fileList = await listAll(listRef);
            const fileUrls = await Promise.all(fileList.items.map(async (item) => {
            const downloadUrl = await getDownloadURL(item);
            return {url:downloadUrl,reff:item};
            }));
            setImageList(fileUrls)
        }
     
       getlist()
    },[])
    
    const downImage=async(url)=>{
        
    const response = fetch('http://localhost:3000/api/getImage',{
        method:'POST',
        body: JSON.stringify({ url: url })
    });
     
    const blob = await response;
    const blobimage=await blob.blob()
            const Url = window.URL.createObjectURL(new Blob([blobimage]));
            const link = document.createElement('a');
            link.href = Url;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
    }

    const handleDelete=(e)=>{
        console.log(e)
        const reff = ref(e);

        // Delete the file
        deleteObject(reff).then(() => {
            alert('file successfully deleted')
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
          alert('error try again if the problem presists contact developer')
          console.log(error)
        });
        
    }
  return (
    <div>
        {imagelist.length!==0? <div>
            <h3>{imagelist.length} images</h3>
            <div className={styles.display_content}>
            {imagelist.map((e,i)=>{
               return <div key={i} className={styles.card}><Image 
               key={i} 
               src={`${e.url}`} 
               alt={`${e.url}`} 
               width={300} 
               height={300} 
               onClick={()=>{downImage(e.url)}}
               />
               <p className={styles.card}>click to download</p>
               <button onClick={()=>{handleDelete(e.reff)}}>Delete</button>
               </div>
            })}
            </div>
        </div>:
        <div><h2>no images to down load</h2></div>}
    </div>
  )
}

export default Sindi_download