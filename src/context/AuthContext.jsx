// import { createContext, useContext, useEffect, useState } from "react"
// import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
// import { auth } from "../auth/firebase.config"
// import axios from "axios"

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const register = (email, password) => {
//     setLoading(true)
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   const login = (email, password) => {
//     setLoading(true)
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const googleLogin = () => {
//     setLoading(true)
//     const provider = new GoogleAuthProvider()
//     return signInWithPopup(auth, provider)
//   }

//   const logout = () => {
//     setLoading(true)
//     localStorage.removeItem("access-token")
//     return signOut(auth)
//   }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser)
//       setLoading(false)

//       if (currentUser) {
//         // send JWT token request
//         axios
//           .post(`${import.meta.env.VITE_API_BASE_URL}/jwt`, { email: currentUser.email })
//           .then(res => {
//             localStorage.setItem("access-token", res.data.token)
//           })
//       } else {
//         localStorage.removeItem("access-token")
//       }
//     })

//     return () => unsubscribe()
//   }, [])

//   const authInfo = {
//     user,
//     loading,
//     register,
//     login,
//     googleLogin,
//     logout
//   }

//   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
// }
