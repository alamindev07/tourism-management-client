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

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveUserToDB = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    const userData = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || "Anonymous",
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL || "",
      role: "tourist", // default role
    };

    try {
      const res = await axios.post(
        "https://tourism-management-server-two-amber.vercel.app/api/users",
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

  // 🔐 Create new user (email & password)
  const createUser = async (email, password) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserToDB(res.user); // Save on registration
    return res;
  };

  // 🔐 Login existing user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Google sign-in
  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserToDB(result.user); // Save user if not already
    return result;
  };

  // 🔐 Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🧑 Update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // 🔁 Reset password
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // 👀 Auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔁 Provide context values
  const authInfo = {
    user,
    loading,
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
