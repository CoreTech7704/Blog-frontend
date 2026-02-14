import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResult";

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
            <section className="pt-32 pb-20 px-6 bg-[#05070d] text-center">
                <h1 
                className="
                    text-4xl sm:text-5xl font-extrabold text-white
                ">
                    Find what you’re looking for
                </h1>

                <p 
                className="
                    mt-4 max-w-2xl mx-auto
                    text-lg text-slate-400
                ">
                    Search blogs, topics, and ideas across VoidWork.
                </p>

                {/* Search bar sits below */}
                <div className="mt-10">
                    <SearchBar onSearch={handleSearch} />
                </div>
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
