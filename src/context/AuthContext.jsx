import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInAnonymously as firebaseSignInAnonymously,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { googleProvider, appleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on initial render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userData = {
          name: user.displayName || "",
          mobile: user.phoneNumber || "",
          email: user.email,
          image: user.photoURL || "",
        };
        await setDoc(userDoc, userData, { merge: true });
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const signUpWithEmail = async (name, mobile, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = { name, mobile, email };
    await setDoc(doc(db, "users", user.uid), userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signInWithGoogle = async () => {
    await signInWithRedirect(auth, googleProvider);
  };

  const signInWithApple = async () => {
    await signInWithRedirect(auth, appleProvider);
    navigate.push("/");
  };

  const signInAnonymously = async () => {
    const result = await firebaseSignInAnonymously(auth);
    setUser(result.user);
    localStorage.setItem("user", JSON.stringify(result.user));
    navigate.push("/");
  };

  const signInWithPhone = async (phoneNumber, appVerifier) => {
    const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return result;
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    navigate.push("/");
  };

  const handleLogin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = doc(db, "users", user.uid);
    const userData = {
      name: user.displayName || "",
      mobile: user.phoneNumber || "",
      email: user.email,
      image: user.photoURL || "",
    };
    await setDoc(userDoc, userData, { merge: true });
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUpWithEmail,
        signInWithGoogle,
        signInWithApple,
        signInWithPhone,
        signInAnonymously,
        handleLogout,
        handleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

