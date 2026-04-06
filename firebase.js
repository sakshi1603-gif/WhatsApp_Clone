// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//auth import 
//step-1
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPIhEPS3AxvXjEeKbFZyFoaUxA9Z5FEPI",
  authDomain: "wa-clone-b435e.firebaseapp.com",
  projectId: "wa-clone-b435e",
  storageBucket: "wa-clone-b435e.firebasestorage.app",
  messagingSenderId: "1020367160134",
  appId: "1:1020367160134:web:4fd684b326f2a16cfa1b47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//step-2
const auth=getAuth(app);
const db = getFirestore();
export {auth, db}