import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/api/axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-32">
      {/* HEADER */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-slate-100">
            Categories
          </h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Browse all topics and explore blogs by category.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="mt-12 px-6 pb-24">
        <div
          className="
            mx-auto max-w-6xl
            grid gap-4
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
          "
        >
          {/* LOADING SKELETON */}
          {loading &&
            [...Array(10)].map((_, i) => (
              <div
                key={i}
                className="
                  rounded-xl border border-white/10
                  bg-slate-950
                  px-4 py-3
                  h-10
                  animate-pulse
                "
              />
            ))}

          {/* ERROR */}
          {error && (
            <p className="col-span-full text-red-400">
              Failed to load categories
            </p>
          )}

          {/* EMPTY */}
          {!loading && !error && categories.length === 0 && (
            <p className="col-span-full text-slate-400">
              No categories found 🚧
            </p>
          )}

          {/* DATA */}
          {!loading &&
            !error &&
            categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/categories/${cat.slug}`}
                className="
                  rounded-xl border border-white/10
                  bg-slate-950
                  px-4 py-3 text-sm text-slate-300
                  hover:text-white hover:border-white/20
                  transition text-center
                "
              >
                #{cat.name}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}

