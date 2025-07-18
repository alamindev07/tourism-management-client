import axios from "axios";

export const saveUserToDB = async ({ uid, name, email, photoURL, role = "tourist" }) => {
  try {
    const cleanedUser = {
      uid,
      email,
      name: name?.trim() || "User",
      photoURL: photoURL?.trim() || null,
      role,
    };

    console.log("📤 Sending user to backend:", cleanedUser); // ✅ Debug

    const res = await axios.post("https://tourism-management-server-two-amber.vercel.app/api/users", cleanedUser, {
      headers: {
        "Content-Type": "application/json", // ✅ Explicitly ensure JSON
      },
    });

    return res.data;

  } catch (error) {
    console.error("❌ Error saving user to DB:", error.response?.data || error.message);
    throw error;
  }
};
