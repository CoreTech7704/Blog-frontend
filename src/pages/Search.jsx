import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResult";
import api from "@/api/axios";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("latest");
  const [type, setType] = useState("blogs");

  async function handleSearch(keyword, pageNum = 1, sortType = sort) {
    if (loading) return;

    if (!keyword || keyword.length < 2) {
      setResults([]);
      setSearched(false);
      setPage(1);
      setPages(0);
      return;
    }

    setQuery(keyword);
    setSearched(true);
    setLoading(true);

    try {
      const res = await api.get("/api/search", {
        params: {
          q: keyword,
          page: pageNum,
          limit: 9,
          sort: sortType,
          type,
        },
      });

      setResults(res.data.results);
      setPage(res.data.page);
      setPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors">
      {/* HEADER */}
      <section className="pt-32 pb-20 px-6 bg-[#05070d] text-center">
        <h1
          className="
                    text-4xl sm:text-5xl font-extrabold text-white
                "
        >
          Find what you’re looking for
        </h1>

        <p
          className="
                    mt-4 max-w-2xl mx-auto
                    text-lg text-slate-400
                "
        >
          Search blogs, topics, and ideas across VoidWork.
        </p>

        {/* Search bar sits below */}
        <div className="mt-10">
          <SearchBar
            onSearch={handleSearch}
            type={type}
            setType={setType}
            placeholder={
              type === "blogs" ? "Search blogs, topics..." : "Search users..."
            }
          />
        </div>
      </section>

      {/* SORT & COUNT */}
      {searched && !loading && (
        <div className="flex items-center justify-between px-6 mt-12 animate-fade-in">
          <h2 className="text-lg text-muted-foreground">
            {total} results for{" "}
            <span className="text-foreground font-medium">"{query}"</span>
          </h2>

          <select
            value={sort}
            onChange={(e) => {
              const value = e.target.value;
              setSort(value);
              handleSearch(query, 1, value);
            }}
            className="input w-auto text-sm"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      )}

      {/* RESULTS */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <SearchResults
            loading={loading}
            searched={searched}
            results={results}
            page={page}
            pages={pages}
            type={type}
            onPageChange={(p) => handleSearch(query, p)}
          />
        </div>
      </section>
    </main>
  );
}
