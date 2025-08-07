// src/api/authApi.js

import axiosInstance from "./axiosInstance";

export async function fetchBackendJWT(user) {
  try {
    const response = await axiosInstance.post("/api/auth/jwt", {
      email: user.email,
      uid: user.uid,
      role: user.role || "tourist",
    });
    const token = response.data.token;
    localStorage.setItem("access_token", token);
    return token;
  } catch (error) {
    console.error("Failed to get backend JWT", error);
    throw error;
  }
}
