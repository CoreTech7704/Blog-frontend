import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ theme, setTheme }) {
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full px-6">
      <nav
        className="
          relative mx-auto mt-4 max-w-6xl h-14 px-6
          bg-transparent
          backdrop-blur-md
          border border-white/20
          rounded-2xl
          flex items-center justify-between
          transition-all duration-500
        "
      >
        {/* Left: Brand */}
        <div className="font-bold text-3xl tracking-tight">
          <Link
            to="/"
            className="
              bg-gradient-to-r from-cyan-500 to-violet-500
              bg-clip-text text-transparent
              hover:from-cyan-400 hover:to-violet-400
              transition-all duration-300
            "
          >
            VoidWork
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link
            key="home"
            to="/"
            className="
                  text-slate-600 dark:text-slate-300
                  hover:text-cyan-500 dark:hover:text-cyan-400
                  relative
                  after:absolute after:bottom-[-6px] after:left-0
                  after:w-0 after:h-[2px]
                  after:bg-cyan-500 dark:after:bg-cyan-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
          >
            Home
          </Link>
          <Link
            key="Blogs"
            to="/blogs"
            className="
                  text-slate-600 dark:text-slate-300
                  hover:text-cyan-500 dark:hover:text-cyan-400
                  relative
                  after:absolute after:bottom-[-6px] after:left-0
                  after:w-0 after:h-[2px]
                  after:bg-cyan-500 dark:after:bg-cyan-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
          >
            Blogs
          </Link>

          {/* User Dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="
                flex items-center gap-1
                text-slate-600 dark:text-slate-300
                hover:text-cyan-500 dark:hover:text-cyan-400
                relative
                after:absolute after:bottom-[-6px] after:left-0
                after:w-0 after:h-[2px]
                after:bg-cyan-500 dark:after:bg-cyan-400
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              User_name
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  userOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`
                absolute right-0 mt-4 w-48
                rounded-xl

                bg-white/60 dark:bg-slate-900/60
                backdrop-blur-2xl

                border border-slate-200/40 dark:border-slate-800/40
                shadow-lg
                overflow-hidden
                z-50

                transition-all duration-200 ease-out
                transform
                ${
                  userOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }
              `}
            >
              <DropdownItem to="/profile" label="Profile" />
              <DropdownItem to="/dashboard" label="Dashboard" />
              <DropdownItem to="/dashboard/blogs/new" label="Create Blog" />
            </div>
          </div>

          <Link
            key="Contact"
            to="/contact"
            className="
                  text-slate-600 dark:text-slate-300
                  hover:text-cyan-500 dark:hover:text-cyan-400
                  relative
                  after:absolute after:bottom-[-6px] after:left-0
                  after:w-0 after:h-[2px]
                  after:bg-cyan-500 dark:after:bg-cyan-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
          >
            Contact Us
          </Link>
          <Link
            key="about"
            to="/about"
            className="
                  text-slate-600 dark:text-slate-300
                  hover:text-cyan-500 dark:hover:text-cyan-400
                  relative
                  after:absolute after:bottom-[-6px] after:left-0
                  after:w-0 after:h-[2px]
                  after:bg-cyan-500 dark:after:bg-cyan-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
          >
            About Us
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* ✅ THE FIX */}
          <ThemeToggle theme={theme} setTheme={setTheme} />

          <Link
            to="/auth?mode=login"
            className="
              px-6 h-10 flex items-center justify-center
              rounded-xl font-semibold text-lg
              bg-gradient-to-r from-cyan-500 to-violet-500 text-stone-950
              hover:from-cyan-400 hover:to-violet-400
              hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25
              active:scale-95 transition-all duration-300
            "
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );

  function DropdownItem({ to, label }) {
    return (
      <Link
        to={to}
        className="
        block px-4 py-2
        text-slate-700 dark:text-slate-300
        hover:bg-slate-100 dark:hover:bg-slate-800
        transition-colors
      "
      >
        {label}
      </Link>
    );
  }
}
