// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEaxJEBqyIgJ9iflfc6YTRGeLhNVeKUc8",
  authDomain: "stock-dekho.firebaseapp.com",
  projectId: "stock-dekho",
  storageBucket: "stock-dekho.appspot.com",
  messagingSenderId: "982562264637",
  appId: "1:982562264637:web:9ba3ed033bc726423c3c54",
  measurementId: "G-DGHEQCS71M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export  {app,db};