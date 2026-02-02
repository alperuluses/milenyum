// Firebase Configuration
// IMPORTANT: Replace these placeholders with your actual Firebase project config
  const firebaseConfig = {
    apiKey: "AIzaSyBqnUKZV26y8LAVOjmx7G9U1Yq3QIKW4zE",
    authDomain: "milenyumderi.firebaseapp.com",
    projectId: "milenyumderi",
    storageBucket: "milenyumderi.firebasestorage.app",
    messagingSenderId: "864204765483",
    appId: "1:864204765483:web:006d23b41e33d34d926d6e",
    measurementId: "G-K3NQHQJX93"
  };

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc , addDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, getDoc, doc , addDoc};
