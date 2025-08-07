import { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/login.json";
import { AuthContext } from "../../context/AuthProvider";
import Lottie from "lottie-react";
import { saveUserToDB } from "../../api/saveUserToDB";

const Login = () => {
  const { login, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || location.state?.shareUrl || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setEmailForReset(email);

    try {
      const result = await login(email, password);
      const user = result.user;

      try {
        await saveUserToDB(user);
      } catch (saveErr) {
        console.error("Failed to save user after login:", saveErr);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName || user.email}`,
        confirmButtonColor: "#3085d6",
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      try {
        await saveUserToDB(user);
      } catch (saveErr) {
        console.error("Failed to save Google user:", saveErr);
      }

      Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        text: `Welcome, ${user.displayName || user.email}`,
        confirmButtonColor: "#3085d6",
      });

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google sign-in failed.");
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: "Please try again later.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!emailForReset) {
      Swal.fire({
        icon: "warning",
        title: "No Email Entered",
        text: "Please enter your email first.",
      });
      return;
    }

    try {
      await resetPassword(emailForReset);
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent!",
        text: "Check your inbox for the reset link.",
      });
    } catch (err) {
      console.error("Password reset error:", err);
      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: "Unable to send reset email. Try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left animation side */}
        <div className="hidden md:flex items-center justify-center bg-slate-200 p-6">
          <Lottie animationData={loginImage} loop={true} className="w-full h-96" />
        </div>

        {/* Right Form Side */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-700 mb-6">Login to Your Account</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-slate-600 text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmailForReset(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 text-black "
              />
            </div>
            <div>
              <label className="text-slate-600 text-sm">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 text-black"
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-slate-600 hover:text-slate-800 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-slate-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 border border-slate-400 py-2 rounded-lg hover:bg-slate-100 transition disabled:opacity-70 cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span className="text-slate-700 font-medium">
              {isGoogleLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </button>

          <p className="text-sm mt-4 text-slate-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-slate-800 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
