// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIMO8j2WH0xyPOp1xE5rd6i7VblYL9CSU",
  authDomain: "liqu1d.firebaseapp.com",
  projectId: "liqu1d",
  storageBucket: "liqu1d.firebasestorage.app",
  messagingSenderId: "989734887366",
  appId: "1:989734887366:web:2b898d6b4dfdab81c61cc7",
  measurementId: "G-DW8L03DEPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);