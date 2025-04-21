
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Error with Google login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-tr from-purple-50 via-white to-purple-100 dark:from-[#181321] dark:to-[#232142] transition-colors">
      {/* Left panel for branding and illustration */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-1/2 flex-col justify-center items-center px-8 py-12 bg-transparent backdrop-blur-lg"
      >
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80"
          alt="Notetaking illustration"
          className="rounded-2xl shadow-xl w-full max-w-[360px] mb-10 animate-fade-in"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 font-sans">
          Welcome to <span className="text-purple-light">NoteNest 🪺</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium mb-8 text-center">
          The smartest, prettiest way to organize your thoughts.
        </p>
        <ul className="space-y-3 w-full max-w-[320px] text-left">
          <li className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-purple-light rounded-full w-7 h-7 text-white font-bold">🧠</span>
            <span className="text-gray-700 dark:text-gray-100">AI summaries & smart tags</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-purple-light rounded-full w-7 h-7 text-white font-bold">🎙</span>
            <span className="text-gray-700 dark:text-gray-100">Voice-to-text & reminders</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-purple-light rounded-full w-7 h-7 text-white font-bold">🌓</span>
            <span className="text-gray-700 dark:text-gray-100">Beautiful dark & light themes</span>
          </li>
        </ul>
        <div className="mt-10 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} NoteNest &mdash; Built with love 💜
        </div>
      </motion.div>
      {/* Right panel for the signup form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col justify-center py-12 px-6"
      >
        <div className="mx-auto w-full max-w-md glass-morphism p-8 rounded-2xl shadow-xl bg-white/80 dark:bg-[#191731]/80">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-purple-dark dark:text-purple-light mb-2 tracking-tight">
              Create your free account
            </h2>
            <p className="text-gray-500 dark:text-gray-300">
              Unlock magical notes & productivity
            </p>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field bg-white/80 dark:bg-[#24203a]/70 font-medium"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field bg-white/80 dark:bg-[#24203a]/70 font-medium"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field bg-white/80 dark:bg-[#24203a]/70 font-medium"
                required
              />
            </div>
            <Button
              type="submit"
              className="btn-primary w-full mt-2 shadow hover:scale-105 hover:bg-purple"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="px-4 bg-white/80 dark:bg-[#24203a]/70 text-muted-foreground">
                Or
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn-google w-full bg-white/80 dark:bg-[#232042]/70 hover:scale-105"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" className="mr-2">
                  <g>
                    <path fill="#4285F4" d="M21.805 10.023h-9.82v3.977h5.617c-.242 1.266-1.174 2.338-2.449 2.932v2.436h3.963c2.316-2.135 3.689-5.285 3.689-9.011 0-.628-.057-1.236-.169-1.834z"/>
                    <path fill="#34A853" d="M11.985 22.001c2.7 0 4.96-.9 6.614-2.437l-3.963-2.435c-1.099.738-2.506 1.176-4.08 1.176-3.134 0-5.79-2.119-6.748-4.957h-4.03v3.119c1.738 3.431 5.388 5.534 9.207 5.534z"/>
                    <path fill="#FBBC05" d="M5.237 13.348A6.432 6.432 0 0 1 4.5 12c0-.468.08-.922.223-1.348v-3.12h-4.03A9.98 9.98 0 0 0 0 11.999c0 1.534.367 2.992 1.03 4.319l4.207-2.97z"/>
                    <path fill="#EA4335" d="M11.985 6.923c1.478 0 2.803.509 3.846 1.506l2.866-2.864c-1.651-1.551-3.91-2.565-6.712-2.565-3.819 0-7.469 2.104-9.207 5.535l4.03 3.119c.958-2.838 3.614-4.957 6.747-4.957z"/>
                  </g>
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
