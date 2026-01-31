import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ChevronDown, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api/axios";

export default function Navbar({ theme, setTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  const location = useLocation();
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  async function handleLogout() {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // ignore backend error
    }

    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/auth?mode=login");
  }

  return (
    <header className="fixed top-0 z-50 w-full px-6">
      <nav
        className="
          relative mx-auto mt-4 max-w-6xl h-14 px-6
          bg-transparent backdrop-blur-md
          border border-white/20 rounded-2xl
          flex items-center justify-between
        "
      >
        {/* Brand */}
        <Link
          to="/"
          className="text-3xl font-bold bg-gradient-to-r
          from-cyan-500 to-violet-500 bg-clip-text text-transparent"
        >
          VoidWork
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-6 text-lg font-medium items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/blogs" label="Blogs" />
          <NavLink to="/contact" label="Contact" />
          <NavLink to="/about" label="About" />

          {/* User dropdown (only when logged in) */}
          {user && (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserOpen((v) => !v)}
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-400"
              >
                {user.fullname || "User"}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${userOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`
                  absolute right-0 mt-3 w-48 rounded-xl
                  bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                  border border-white/20 shadow-lg
                  transition-all duration-200
                  ${userOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                  }
                `}
              >
                <DropdownItem to="/profile" label="Profile" />
                <DropdownItem to="/dashboard" label="Dashboard" />
                <DropdownItem to="/dashboard/blogs/new" label="Create Blog" />

                <button
                  onClick={handleLogout}
                  className="
                    w-full text-left px-4 py-2
                    text-red-500 hover:bg-red-500/10
                  "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />

          <button
            className="md:hidden text-slate-300 text-2xl"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Menu />
          </button>

          {!user && (
            <Link
              to="/auth?mode=login"
              className="
                px-5 h-10 flex items-center justify-center
                rounded-xl font-semibold
                bg-gradient-to-r from-cyan-500 to-violet-500
                text-black hover:scale-105 transition
              "
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="
            md:hidden mt-2 mx-4
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
            border border-white/20 rounded-2xl
            p-4 space-y-4
            transition-all duration-200 ease-out
          "
        >
          <MobileLink to="/" label="Home" setMobileOpen={setMobileOpen} />
          <MobileLink to="/blogs" label="Blogs" setMobileOpen={setMobileOpen} />
          <MobileLink to="/contact" label="Contact" setMobileOpen={setMobileOpen} />
          <MobileLink to="/about" label="About" setMobileOpen={setMobileOpen} />

          {user ? (
            <>
              <MobileLink to="/profile" label="Profile" setMobileOpen={setMobileOpen} />
              <MobileLink to="/dashboard" label="Dashboard" setMobileOpen={setMobileOpen} />
              <MobileLink
                to="/dashboard/blogs/new"
                label="Create Blog"
                setMobileOpen={setMobileOpen}
              />

              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <MobileLink
              to="/auth?mode=login"
              label="Login"
              setMobileOpen={setMobileOpen}
            />
          )}
        </div>
      )}

    </header>
  );
}

/* ---------- Helpers ---------- */

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="
        text-slate-300 hover:text-cyan-400
        relative after:absolute after:-bottom-1
        after:left-0 after:h-[2px] after:w-0
        after:bg-cyan-400 after:transition-all
        hover:after:w-full
      "
    >
      {label}
    </Link>
  );
}

function DropdownItem({ to, label }) {
  return (
    <Link
      to={to}
      className="
        block px-4 py-2
        text-slate-700 dark:text-slate-300
        hover:bg-slate-100 dark:hover:bg-slate-800
      "
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, label, setMobileOpen }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        setMobileOpen(false);
        navigate(to);
      }}
      className="block w-full text-left text-slate-700 dark:text-slate-300
                 hover:text-cyan-400"
    >
      {label}
    </button>
  );
}
