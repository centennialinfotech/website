import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import Clients from "./pages/Clients";
import BlogDetails from "./pages/BlogDetails";
import ClientDetails from "./pages/clientDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/client" element={<Clients />} />
        <Route path="/blog-details/:id?" element={<BlogDetails />} />
        <Route path="/clientDetails" element={<ClientDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
