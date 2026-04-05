import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch, placeholder, type, setType }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query.trim());
  }

  function clearSearch() {
    setQuery("");
    onSearch("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto max-w-2xl w-full
        rounded-2xl border border-white/15
        bg-black/60 backdrop-blur-md
        px-3 py-2
        space-y-3
        md:space-y-0
        md:flex md:items-center md:gap-2
      "
    >
      {/* Top row */}
      <div className="flex items-center gap-2 flex-1">
        <Search size={18} className="text-slate-400 shrink-0" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="
            flex-1 min-w-0
            bg-transparent
            text-white placeholder-slate-500
            outline-none text-sm
          "
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              p-1 rounded-md
              text-slate-400 hover:text-white
              hover:bg-white/10
              transition shrink-0
            "
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex gap-2 md:w-auto">
        <select
          value={type}
          onChange={(e) => {
            const value = e.target.value;
            setType(value);
            if (query) onSearch(query);
          }}
          className="
            flex-1 md:flex-none
            rounded-lg
            bg-white/5
            text-sm text-slate-300
            border border-white/10
            px-2 py-1
            outline-none
          "
        >
          <option value="blogs">Blogs</option>
          <option value="users">Users</option>
        </select>

        <button
          type="submit"
          disabled={!query.trim()}
          className="
            px-4 py-1 rounded-lg
            text-sm font-medium
            bg-white text-black
            hover:bg-slate-200
            disabled:opacity-50 disabled:cursor-not-allowed
            transition
          "
        >
          Search
        </button>
      </div>
    </form>
  );
}