import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider, PhoneAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAAfNCdbyCk9iNqUBr0aTCOWdgpEE5G5A",
  authDomain: "gymate-gym-07.firebaseapp.com",
  projectId: "gymate-gym-07",
  storageBucket: "gymate-gym-07.appspot.com",
  messagingSenderId: "764450117336",
  appId: "1:764450117336:web:defa1321b2e5f832a9a9ad",
  measurementId: "G-KZ3WWJ5J54",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const phoneProvider = new PhoneAuthProvider(auth);


// 764450117336-856ihipq5sm7ss2elqbllhp6bb6s604f.apps.googleusercontent.com - client id

// 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 - client secret