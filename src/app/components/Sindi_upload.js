'use client'
import firebase from "@/app/db/firebase/db";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

function Sindi_upload() {
    const [file,setfile]=useState(null)
    const uploaddata=async(folder)=>{
        if(file){ 
            const storage = getStorage();    
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, `${folder}/` + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              }, 
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;
            
                  // ...
            
                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              }, 
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  alert('image has been uploaded')
                });
              }
            );
        }else{
            alert("no file added")
        }
       
    }
    
  return (
    <div>
      <h2>image</h2>
        <input type="file" accept="image/*" onChange={(e)=>{
           setfile(e.target.files[0])
        }}/>
        <h2 onClick={()=>{uploaddata('image')}}>uplaod image here</h2>
    </div>
  )
}

export default Sindi_upload