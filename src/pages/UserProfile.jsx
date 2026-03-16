import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api/axios";
import BlogCard from "@/components/BlogCard";

export default function UserProfile() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/user/${username}`)
      .then((res) => {
        setUser(res.data.user);
        setBlogs(res.data.blogs);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading || !user) {
    return (
      <p className="text-center mt-24 text-muted-foreground">
        Loading profile...
      </p>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 my-24">

      {/* ================= PROFILE SECTION ================= */}
      <section className="flex flex-col items-center text-center">

        <img
          src={user.avatar?.url || "https://res.cloudinary.com/daax8dehh/image/upload/v1773673391/default-avatar_qwz0c2.webp"}
          alt={user.username}
          className="w-28 h-28 rounded-full object-cover border border-border"
        />

        <h1 className="text-3xl font-bold mt-4">
          {user.fullname}
        </h1>

        <p className="text-muted-foreground">
          @{user.username}
        </p>

        {user.bio && (
          <p className="max-w-xl mt-4 text-muted-foreground">
            {user.bio}
          </p>
        )}

      </section>


      {/* ================= STATS SECTION ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

        {/* Blog Count */}
        <div className="card text-center p-6">
          <p className="text-2xl font-bold">{blogs.length}</p>
          <p className="text-sm text-muted-foreground">
            Published Blogs
          </p>
        </div>

        {/* Role */}
        <div className="card text-center p-6">
          <p className="text-2xl font-bold">
            {user.isAuthor ? "Author" : "User"}
          </p>
          <p className="text-sm text-muted-foreground">
            Role
          </p>
        </div>

        {/* Joined Date */}
        <div className="card text-center p-6">
          <p className="text-2xl font-bold">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-sm text-muted-foreground">
            Joined
          </p>
        </div>

      </section>


      {/* ================= BLOG SECTION ================= */}
      <section className="mt-16">

        <h2 className="text-xl font-semibold mb-6">
          Published Blogs
        </h2>

        {blogs.length === 0 && (
          <p className="text-muted-foreground">
            This user hasn't published any blogs yet.
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              slug={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              category={blog.category?.name || "General"}
              readTime={blog.readingTime}
              createdAt={blog.createdAt}
            />
          ))}
        </div>

      </section>

    </main>
  );
}