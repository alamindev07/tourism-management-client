import { useContext, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import loginImage from "../../assets/login.json"; 
import { AuthContext } from "../../context/AuthProvider";
import Lottie from "lottie-react";

const Login = () => {
  const { signInUser, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [emailForReset, setEmailForReset] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setEmailForReset(email);

    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google sign-in failed.");
      toast.error("Google sign-in failed.");
    }
  };

  const handleForgotPassword = async () => {
    if (!emailForReset) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      await resetPassword(emailForReset);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error("Failed to send reset email");
      console.error(err);
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

            {/* Forgot Password */}
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
              className="w-full mt-2 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300"
            >
              Login
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
            className="w-full flex items-center justify-center gap-2 border border-slate-400 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-slate-700 font-medium">Continue with Google</span>
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
