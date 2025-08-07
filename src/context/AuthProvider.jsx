

// context/AuthProvider.jsx
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase.config";
import axios from "axios";
import { fetchBackendJWT } from "../api/authApi";  // <-- import fetchBackendJWT here

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const saveUserToDB = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    const userData = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || "Anonymous",
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL || "",
      role: "tourist",
    };

    try {
      const res = await axios.post(
        "/api/users",
        userData
      );
      console.log("✅ User saved to MongoDB:", res.data);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log("ℹ️ User already exists in MongoDB");
      } else {
        console.error("❌ Failed to save user:", error);
      }
    }
  };

  const fetchAndStoreJWT = async (firebaseUser) => {
    try {
      const backendToken = await fetchBackendJWT({
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        role: "tourist",
      });
      setToken(backendToken);
      localStorage.setItem("access_token", backendToken);
    } catch (error) {
      console.error("Failed to fetch JWT token", error);
    }
  };

  const createUser = async (email, password) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToDB(res.user);
    await fetchAndStoreJWT(res.user);
    setUser(res.user);
    setLoading(false);
    return res;
  };

  const login = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    await fetchAndStoreJWT(res.user);
    setUser(res.user);
    setLoading(false);
    return res;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserToDB(result.user);
    await fetchAndStoreJWT(result.user);
    setUser(result.user);
    setLoading(false);
    return result;
  };

  const logout = () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    return signOut(auth).finally(() => setLoading(false));
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        await fetchAndStoreJWT(currentUser);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem("access_token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    token,
    createUser,
    login,
    logout,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
