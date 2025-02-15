// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_1NxiKOcBOfkRFaaXhF-7eo5uIMtQqiw",
  authDomain: "movie-demo-d99d1.firebaseapp.com",
  projectId: "movie-demo-d99d1",
  storageBucket: "movie-demo-d99d1.firebasestorage.app",
  messagingSenderId: "304251527602",
  appId: "1:304251527602:web:bcd0926da913104d0d44ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);