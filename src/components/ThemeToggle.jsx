import { useState } from "react";
import { applyTheme } from "../utils/theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    setIsDark(!isDark);
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-md
                 bg-slate-800 hover:bg-slate-700
                 flex items-center justify-center
                 transition hover:scale-105"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
