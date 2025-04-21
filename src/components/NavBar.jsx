
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "../context/ThemeContext";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  
  return (
    <nav className="bg-card shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple">Notizen</span>
              <span className="ml-1 text-2xl">🪺</span>
            </Link>
          </div>
          
          {currentUser && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "nav-link-active" : ""
                }`}
              >
                Notes
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                onClick={handleLogout}
              >
                <FiLogOut className="mr-2" />
                Logout
              </Button>
            </div>
          )}

          {!currentUser && (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-accent"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
          
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-foreground hover:bg-accent"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {currentUser ? (
                <>
                  <Link
                    to="/"
                    className="block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Notes
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
