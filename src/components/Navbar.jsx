import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, setTheme }) {
  // State to manage authentication status
  const [isAuth, setIsAuth] = useState(false);

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
        <div className="hidden md:flex gap-8 text-lg font-medium">
          {["Home", "Blogs", "User Name", "Contact Us", "About Us"].map(
            (item) => (
              <Link
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
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
                {item}
              </Link>
            )
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* ✅ THE FIX */}
          <ThemeToggle theme={theme} setTheme={setTheme} />

          <button
            onClick={() => setIsAuth(!isAuth)}
            className="
              px-6 h-10 rounded-xl font-semibold text-lg
              bg-gradient-to-r from-cyan-500 to-violet-500 text-stone-950
              hover:from-cyan-400 hover:to-violet-400
              hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25
              active:scale-95 transition-all duration-300
            "
          >
            {isAuth ? "Logout" : "Login"}
          </button>
        </div>
      </nav>
    </header>
  );
}
