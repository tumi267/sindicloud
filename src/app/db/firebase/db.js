// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnd2iAOcC7EOH0OdZNSJWyHtdUcvvdSM0",
  authDomain: "sindi-storage.firebaseapp.com",
  projectId: "sindi-storage",
  storageBucket: "sindi-storage.appspot.com",
  messagingSenderId: "430224854058",
  appId: "1:430224854058:web:24aa0ce4f3136dbd34c753",
  measurementId: "G-BEHHCTFDBX"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase
