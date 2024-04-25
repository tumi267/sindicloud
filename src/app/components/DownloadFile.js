'use client'
import firebase from "@/app/db/firebase/db";
import { getStorage, ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from './download.module.css'
function DownloadFile() {
    // Create a reference to the file we want to download
    const storage = getStorage();
    const listRef=(ref(storage, 'files/'))
    const [imagelist,setImageList]=useState([])
    useEffect(()=>{
        const getlist=async()=>{
            const fileList = await listAll(listRef);
            const fileUrls = await Promise.all(fileList.items.map(async (item) => {
            const downloadUrl = await getDownloadURL(item);
           
            return {url: downloadUrl, reff:item };
            }));
            setImageList(fileUrls)
        }
     
       getlist()
    },[])
    const downLoadFile=async(url,name)=>{
        const response = fetch('http://localhost:3000/api/download',{
            method:'POST',
            body: JSON.stringify({ url: url })
        });
         
        const blob = await response;
       
        const blobimage=await blob.blob()
       
                const Url = window.URL.createObjectURL(new Blob([blobimage]));
                const link = document.createElement('a');
                link.href = Url;
                link.setAttribute('download', `${name}`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
    }
    const handleDelete=(e)=>{
      
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
            <h3>{imagelist.length} document files</h3>
            <div className={styles.display_content}>
            {imagelist.map((e,i)=>{
               return <div className={styles.card} key={i} >
                <div onClick={()=>{downLoadFile(e.url,e.name)}}>
                <iframe className={styles.frames} src={`https://docs.google.com/viewer?url=${encodeURIComponent(e.url)}&embedded=true`} width="300" height="300" scrolling="no"></iframe>
                <h3>{e.reff.name}</h3>
                <h4>click here to download</h4>
                </div>
                <button onClick={()=>{handleDelete(e.reff)}}>Delete</button>
                </div>
            })}
            </div>
        </div>:
        <div><h2>no files to download</h2></div>}
    </div>
  )
}

export default DownloadFile