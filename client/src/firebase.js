// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d75ce.firebaseapp.com",
  projectId: "mern-estate-d75ce",
  storageBucket: "mern-estate-d75ce.appspot.com",
  messagingSenderId: "427031544565",
  appId: "1:427031544565:web:1b4ad4e353f48b4d143bbc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
