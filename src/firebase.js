// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGzbUnXW_5c5VqgcN4uSYCMSz5OG7g-u8",
  authDomain: "ak-blog-3235a.firebaseapp.com",
  projectId: "ak-blog-3235a",
  storageBucket: "ak-blog-3235a.appspot.com",
  messagingSenderId: "701163365985",
  appId: "1:701163365985:web:fedbf4ae392464ff4dec20",
  measurementId: "G-X3231BT6T4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth, provider, db, storage };
