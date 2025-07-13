import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import registerAnimation from "../../assets/registration.json"; 
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      console.log("Registered user:", result.user);
      form.reset();
          toast.success("User Registration successfull!");
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
            toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left animation side */}
        <div className="hidden md:flex items-center justify-center bg-slate-200 p-6">
          <Lottie animationData={registerAnimation} loop={true} className="w-full h-96" />
          
        </div>

        {/* Right form side */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-700 mb-6">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-slate-600 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
              <div>
              <label className="text-slate-600 text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <div>
              <label className="text-slate-600 text-sm">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          
            <div>
              <label className="text-slate-600 text-sm">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full mt-4 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300"
            >
              Register
            </button>
          </form>

          {/* OR divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-slate-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border border-slate-400 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-slate-700 font-medium">Continue with Google</span>
          </button>

          <p className="text-sm mt-4 text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-800 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
