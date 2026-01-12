import api from "@/api/axios";

export const fetchCategories = () =>
  api.get("/api/categories").then(res => res.data);

export const fetchBlogsByCategory = (slug) =>
  api.get(`/api/categories/${slug}/blogs`).then(res => res.data);
