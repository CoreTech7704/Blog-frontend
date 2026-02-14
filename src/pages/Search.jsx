import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSearch(keyword) {
    setQuery(keyword);
    setSearched(true);
    setLoading(true);

    // TEMP: mock search
    setTimeout(() => {
      setResults([]); // replace with real data later
      setLoading(false);
    }, 700);
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors">
      {/* HEADER */}
      <section className="pt-32 pb-16 px-6 bg-[#05070d]">
        <h1 className="text-center text-4xl font-bold text-white mb-8">
          Search
        </h1>

        <SearchBar onSearch={handleSearch} />
      </section>

      {/* RESULTS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SearchResults
            loading={loading}
            searched={searched}
            results={results}
          />
        </div>
      </section>
    </main>
  );
}
