import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";          // ← ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyBCW_PrnhhMDR-4wFNCVLoOjR-xxmwz4-I",
  authDomain: "karrivo-f64dd.firebaseapp.com",
  projectId: "karrivo-f64dd",
  storageBucket: "karrivo-f64dd.firebasestorage.app",
  messagingSenderId: "983101858915",
  appId: "1:983101858915:web:58a66c6525b483ea010456",
  measurementId: "G-FSQ09LH0FY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);                 // ← ADD THIS