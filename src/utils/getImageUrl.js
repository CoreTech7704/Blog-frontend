export function getImageUrl(path) {
  if (!path) return "";
  return `${import.meta.env.VITE_API_URL}${path}`;
}