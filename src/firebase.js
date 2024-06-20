import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAAfNCdbyCk9iNqUBr0aTCOWdgpEE5G5A",
  authDomain: "gymate-gym-07.firebaseapp.com",
  projectId: "gymate-gym-07",
  storageBucket: "gymate-gym-07.appspot.com",
  messagingSenderId: "764450117336",
  appId: "1:764450117336:web:defa1321b2e5f832a9a9ad",
  measurementId: "G-KZ3WWJ5J54"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);