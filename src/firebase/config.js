// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBFb2Lq46W53bBYgH0MM3zCdWMmZ0s0kZQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tsungiai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tsungiai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tsungiai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "544448000375",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:544448000375:web:a8ab57676a7719812c3172",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-C05PSMTJ9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;