import blogs from "@/data/blogs.json";

// Returns a list of unique blog categories (tags)
export function getCategories() {
  const TagSet = new Set();

  // Collect tags from all blogs
  blogs.forEach((blog) => {
    blog.tags?.forEach((tag) => {
      TagSet.add(tag.toLowerCase());
    });
  });

  return Array.from(TagSet);
}
