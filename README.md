# 📝 Core Blog Platform

A modern, full-stack blogging platform built with **Node.js, Express, MongoDB, and React**, designed for developers and content creators.
Supports authentication, markdown blogging, categories, comments, and media uploads with a clean, production-ready architecture.



## 🚀 Live Demo

* **Frontend:** [https://blog-frontend-steel-three.vercel.app](https://blog-frontend-steel-three.vercel.app)
* **Backend API:** [https://blog-backend-3laz.onrender.com](https://blog-backend-3laz.onrender.com)

> ⚠️ First load may be slow due to free-tier cold starts.


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
* Multer (image uploads)
* Redis (optional caching)
* Helmet, CORS, Rate Limiting

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

## ✨ Features

### 🔐 Authentication

* User signup & login
* JWT + refresh token flow
* Protected routes
* Clean auth state handling

### 👤 User Profile

* View & edit profile
* Avatar upload with preview
* Image validation (type & size)
* Secure access control

### 📝 Blog System

* Create, edit, delete blogs
* Draft & publish workflow
* Markdown editor support
* Optional cover image upload
* SEO-friendly slug routing
* Estimated reading time

### 🏷️ Categories

* Category-based blog organization
* Slug-based category routes
* Admin-protected category management

### 💬 Comments

* Auth-protected commenting
* Live comment updates
* Comment deletion support

### 🌐 Routing & UX

* SPA routing with refresh support
* Skeleton loaders
* Graceful timeout handling
* Clean error states
* No infinite loops or console noise

---

## 🧪 Tested & Stable

* Authentication flow
* Profile & avatar uploads
* Blog CRUD (with & without images)
* Markdown rendering
* Categories & comments
* Route refresh & deep linking
* Free-tier performance handling

## ⚠️ Known Limitations

* Free-tier hosting causes cold starts
* Uploaded images are stored on ephemeral storage (Render)
* Image replacement after blog creation not supported (planned)
* No email notifications yet


## 📌 Versioning

* **Frontend:** v1.5.0 (Stable Beta)
* **Backend:** v1.5.0 (Stable Beta)


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

Create a `.env` file for both frontend and backend as required.



## 🤝 Contributing

This project is currently in **beta**.
Feedback, bug reports, and feature suggestions are welcome.


## 👨‍💻 Author

**Sarvam Patel**
GitHub: [https://github.com/CoreTech7704](https://github.com/CoreTech7704)

## 🏁 Final Note

This project represents a **complete, production-deployed full-stack application**, focusing on clean architecture, real-world deployment challenges, and scalable design.

Built with care, tested thoroughly, and ready for iteration 🚀

