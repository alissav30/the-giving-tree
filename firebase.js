// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// Removed unnecessary import as you've already defined 'storage' through getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ6qNAFNSvyFyImdNv2fcwTMI7YO4kZ3k",
  authDomain: "thegivingtree-fa759.firebaseapp.com",
  databaseURL: "https://thegivingtree-fa759-default-rtdb.firebaseio.com/",
  projectId: "thegivingtree-fa759",
  storageBucket: "thegivingtree-fa759.appspot.com",
  messagingSenderId: "158149705053",
  appId: "1:158149705053:web:a64a4f84abf1712badbcb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export the instances
export { app, database, firestore, storage };