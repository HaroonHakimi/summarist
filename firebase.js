// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe1sbuhOWGCwmG8EannOnn_PQFebbG4KY",
  authDomain: "summarist-1bdac.firebaseapp.com",
  projectId: "summarist-1bdac",
  storageBucket: "summarist-1bdac.appspot.com",
  messagingSenderId: "457537709043",
  appId: "1:457537709043:web:6d7c6d9139f26af23a6886",
  measurementId: "G-JWRKRV8TKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage()

const analytics = getAnalytics(app);