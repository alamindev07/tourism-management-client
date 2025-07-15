


export const saveUserToDB = async (user) => {
  try {
    const newUser = {
      uid: user.uid,
      name: user.displayName || "User",
      email: user.email,
      photoURL: user.photoURL || null,
      role: "tourist", // default role
    };

    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("❌ Server responded with error:", errorData);
      throw new Error("Failed to save user");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Network or logic error while saving user:", err);
    throw err;
  }
};
