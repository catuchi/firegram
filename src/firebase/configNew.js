// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6ce2lOpVVDDHS129m8zArA9TZ0crfq74",
  authDomain: "firegram-8c7a1.firebaseapp.com",
  projectId: "firegram-8c7a1",
  storageBucket: "firegram-8c7a1.appspot.com",
  messagingSenderId: "328546841641",
  appId: "1:328546841641:web:d8bd9af68171615eedd838",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { storage, db };
