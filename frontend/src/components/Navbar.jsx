import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookText, ArrowRight, Menu, X } from "lucide-react";
import { assets } from "../assets/assets"; // adjust path
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state)=>state.auth.token)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-bold text-lg text-gray-900 cursor-pointer"
        >
          {/* <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
            <BookText className="text-white w-4 h-4" />
          </div> */}
          <img src={assets.symbol} alt="logo" className="w-7 h-7" />
          BlogX
        </div>

        {/* Desktop Login Button */}
        <button
          onClick={() => navigate("/admin")}
          className="hidden sm:flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          {token?"Dashboard":"Login"} 
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden px-6 pb-4 flex flex-col gap-3 border-t border-gray-100">
          {["Technology", "Startup", "Lifestyle", "Finance"].map((item) => (
            <p
              key={item}
              onClick={() => { navigate(`/${item.toLowerCase()}`); setMenuOpen(false); }}
              className="text-gray-600 font-medium py-1 cursor-pointer"
            >
              {item}
            </p>
          ))}
          <button
            onClick={() => navigate("/login")}
            className="mt-1 flex items-center justify-center gap-1.5 bg-violet-600 text-white text-sm font-semibold px-5 py-2 rounded-full"
          >
            login <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;