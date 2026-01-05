import { useState } from "react";
import { applyTheme } from "../utils/theme";

// ThemeToggle component to switch between light and dark themes
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Function to toggle the theme
  function toggleTheme() {
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    setIsDark(next === "dark");
  }

  // Render the toggle button
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        w-9 h-9 rounded-md
        bg-slate-800 hover:bg-slate-700
        flex items-center justify-center
        transition hover:scale-105
      "
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
