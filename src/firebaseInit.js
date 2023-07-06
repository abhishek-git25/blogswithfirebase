// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgIlbb2PuD0L84Cq5X3ufDmnItySnCgJY",
  authDomain: "blogging-app-bf5d6.firebaseapp.com",
  projectId: "blogging-app-bf5d6",
  storageBucket: "blogging-app-bf5d6.appspot.com",
  messagingSenderId: "1098148462714",
  appId: "1:1098148462714:web:b440171b2be495dac43bc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)