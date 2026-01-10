import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Blogs from "./pages/Blogs";
import CategoriesPage from "./pages/Categories";
import BlogView from "./pages/BlogView";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import Dashboard from "./pages/Dashboard"
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog"

function App() {
  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          bg-white
          dark:bg-slate-950
        "
      >
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<ProfileEdit />}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/blogs/new" element={<CreateBlog />} />
          <Route path="/dashboard/blogs/:id/edit" element={<EditBlog />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />

          {/* Content */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/blogs/:slug" element={<BlogView />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
