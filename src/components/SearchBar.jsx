import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  }

  function clearSearch() {
    setQuery("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto flex items-center gap-2
        w-full max-w-2xl
        rounded-xl
        border border-white/15
        bg-black/60 backdrop-blur-md
        px-3 py-2
        focus-within:ring-2 focus-within:ring-cyan-500/40
        transition
      "
    >
      {/* Icon */}
      <Search size={18} className="text-slate-400 shrink-0" />

      {/* Input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs, topics, authors…"
        className="
          flex-1 bg-transparent
          text-white placeholder-slate-500
          outline-none text-sm
        "
      />

      {/* Clear */}
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="
            p-1 rounded-md
            text-slate-400 hover:text-white
            hover:bg-white/10
            transition
          "
        >
          <X size={16} />
        </button>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!query}
        className="
          ml-2 px-4 py-1.5 rounded-lg
          text-sm font-medium
          bg-white text-black
          hover:bg-slate-200
          disabled:opacity-50 disabled:cursor-not-allowed
          transition
        "
      >
        Search
      </button>
    </form>
  );
}
