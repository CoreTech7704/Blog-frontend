import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Auth from "./pages/Auth"
import Contact from "./pages/Contact"

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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
