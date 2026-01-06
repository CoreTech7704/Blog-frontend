import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, setTheme }) {

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
                key="Blog"
                to="/blog"
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
                Blog
          </Link>
          <Link
                key="User"
                to="/user"
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
                User
          </Link>
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
}
