import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "store-tutorial-f0cd6.firebaseapp.com",
  projectId: "store-tutorial-f0cd6",
  storageBucket: "store-tutorial-f0cd6.appspot.com",
  messagingSenderId: "432568521554",
  appId: "1:432568521554:web:1787e8ebea4d064e79208b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);