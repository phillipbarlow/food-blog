import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Nav from "./components/Nav.jsx";
// import profileIcon from './images/profile-icon.png'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between bg-gray-300 h-[100px]">
        <Nav />
        
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}
