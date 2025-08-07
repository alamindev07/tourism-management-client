import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthProvider";
import registerAnimation from "../../assets/registration.json";
import Swal from "sweetalert2";

import { saveUserToDB } from "../../api/saveUserToDB";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || location.state?.shareUrl || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Show loading alert
    Swal.fire({
      title: 'Registering user...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const result = await createUser(email, password);

      // Wait for profile update
      await updateUserProfile(name, photo);

      const userToSave = {
        uid: result.user.uid,
        name,
        email,
        photoURL: photo || null,
        role: "tourist",
      };

      await saveUserToDB(userToSave);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "User registration successful!",
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      Swal.close();
      console.error("Register error:", err);
      const message = err.message || "Registration failed.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);

    Swal.fire({
      title: 'Signing in with Google...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userToSave = {
        uid: user.uid,
        name: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL || null,
        role: "tourist",
      };

      await saveUserToDB(userToSave);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Registered with Google successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (err) {
      Swal.close();
      console.error("Google sign-in error:", err);
      const message = err.message || "Google sign-in failed.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: message,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left animation */}
        <div className="hidden md:flex items-center justify-center bg-slate-200 p-6">
          <Lottie animationData={registerAnimation} loop={true} className="w-full h-96" />
        </div>

        {/* Right form */}
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
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <label className="text-slate-600 text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <label className="text-slate-600 text-sm">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                disabled={isLoading || isGoogleLoading}
              />
            </div>
            <div>
              <label className="text-slate-600 text-sm">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                disabled={isLoading || isGoogleLoading}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full mt-4 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? "Registering..." : "Register"}
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
            disabled={isLoading || isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 border border-slate-400 py-2 rounded-lg hover:bg-slate-100 transition disabled:opacity-70 cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span className="text-slate-700 font-medium">
              {isGoogleLoading ? "Signing in..." : "Continue with Google"}
            </span>
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
