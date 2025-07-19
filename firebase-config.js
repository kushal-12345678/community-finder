// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// 🔁 Replace this with your actual Firebase config
/*const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "community-finder.firebaseapp.com",
  projectId: "community-finder",
  storageBucket: "community-finder.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};*/

const firebaseConfig = {
    apiKey: "AIzaSyA_x9Xqfcd6IobGfX3oZoS6ha8NWbN-Z0I",
    authDomain: "community-finder-5ea2c.firebaseapp.com",
    projectId: "community-finder-5ea2c",
    storageBucket: "community-finder-5ea2c.firebasestorage.app",
    messagingSenderId: "464825225781",
    appId: "1:464825225781:web:adbc2866dda3cb361bd77c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Export auth object for use in script.js
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged }; */

//Make auth globally available
window.auth=auth;
