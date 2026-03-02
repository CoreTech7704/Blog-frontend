# 📝 Core Blog Platform - v2.0.0

A modern, **production-ready full-stack blogging platform** built with **Node.js, Express, MongoDB, and React**, designed for developers and content creators.

Supports authentication, markdown blogging, categories, comments, and **CDN-backed media uploads**, with a clean, scalable architecture.


## 🚀 Live Demo

* **Frontend:** [https://blog-frontend-steel-three.vercel.app](https://blog-frontend-steel-three.vercel.app)
* **Backend API:** [https://blog-backend-3laz.onrender.com](https://blog-backend-3laz.onrender.com)

> ⚠️ First request may be slow due to free-tier cold starts.


## 📦 Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS
* Axios
* Markdown rendering + syntax highlighting

### Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer (memory uploads)
* **Cloudinary (image storage & CDN)**
* Redis (Upstash – caching)
* Helmet, CORS, Rate Limiting

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **Media:** Cloudinary CDN



## ✨ Features

### 🔐 Authentication

* User signup & login
* JWT-based auth flow
* Protected routes
* Secure token handling

### 👤 User Profiles

* View & edit profile
* Avatar upload with live preview
* Cloudinary-hosted avatars
* Automatic image replacement & cleanup
* Secure ownership checks

### 📝 Blog System

* Create, edit, delete blogs
* Draft & publish workflow
* Markdown editor support
* Optional cover image upload
* Cloudinary-hosted blog covers
* SEO-friendly slugs
* Estimated reading time calculation

### 🏷️ Categories

* Category-based blog organization
* Slug-based category routing
* Admin-protected category management

### 💬 Comments

* Auth-protected commenting
* Real-time comment updates
* Comment deletion (owner-only)

### 🌐 Routing & UX

* SPA routing with deep-link support
* Skeleton loaders
* Graceful loading & error states
* No unnecessary re-renders or console noise


## 🧪 Tested & Stable

* Auth & protected routes
* Profile updates & avatar uploads
* Blog CRUD (with & without covers)
* Markdown rendering
* Categories & comments
* Cache invalidation (Redis)
* Route refresh & deep linking
* Cloudinary image persistence across restarts


## ⚠️ Known Limitations

* Free-tier hosting causes cold starts
* No email notifications yet


## 📌 Versioning

* **Frontend:** v2.0.0
* **Backend:** v2.5.0

> v2 introduces **Cloudinary-based media storage**, improved schema design, and production-safe image handling.


## 🛠️ Local Development

### Backend

```bash
git clone https://github.com/CoreTech7704/blog-backend.git
cd blog-backend
npm install
npm run dev
```

### Frontend

```bash
git clone https://github.com/CoreTech7704/Blog-frontend.git
cd Blog-frontend
npm install
npm run dev
```

Create `.env` files for both frontend and backend as required.

```bash
VITE_API_URL=http://localhost:8000
```

## 🤝 Contributing

This project is actively evolving.
Feedback, bug reports, and feature suggestions are welcome.


## 👨‍💻 Author

**Sarvam Patel**
GitHub: [https://github.com/CoreTech7704](https://github.com/CoreTech7704)
