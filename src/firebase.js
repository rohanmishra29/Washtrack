import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeity1jTgZV-ziaaLLcI1JwEN6HMmaNOc",
  authDomain: "washtrack-nith.firebaseapp.com",
  projectId: "washtrack-nith",
  storageBucket: "washtrack-nith.firebasestorage.app",
  messagingSenderId: "610116695058",
  appId: "1:610116695058:web:c3c02c98164c4ea51fd4cb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);