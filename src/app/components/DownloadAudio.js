'use client'
import firebase from "@/app/db/firebase/db";
import { getStorage, ref, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
function DownloadAudio() {
    // Create a reference to the file we want to download
    const storage = getStorage();
    const listRef=(ref(storage, 'audio/'))
    const [imagelist,setImageList]=useState([])
    UseEffect(()=>{
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
            <h3>{imagelist.length} audio files</h3>
            {imagelist.map((e,i)=>{
               return <div key={i} ><audio
               src={`${e.url}`} 
               alt={`${e.url}`} 
               controls
               />
               <button onClick={()=>{handleDelete(e.reff)}}>Delete</button>
               </div>
            })}
        </div>:
        <div><h2>no audio to download</h2></div>}
    </div>
  )
}

export default DownloadAudio