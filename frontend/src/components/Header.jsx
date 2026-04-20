import { useRef } from "react";
import { Search, Sparkles } from "lucide-react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../store/slices/blogSlice";

const Header = () => {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.blog.input);
  const inputRef = useRef();

  const handleSearch = (e) => {
    e?.preventDefault();
    dispatch(setInput(inputRef.current.value));
  };

  const onClear = () => {
    dispatch(setInput(""));
    inputRef.current.value = "";
  };

  return (
    <div
      className="relative w-full py-20 px-4 flex flex-col items-center text-center"
      style={{ backgroundImage: `url(${assets.gradientBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Badge */}
      <div className="flex items-center gap-1.5 bg-white/70 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
        <Sparkles className="w-3.5 h-3.5 text-violet-500" />
        New AI feature integrated
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-xl mb-4">
        Your own{" "}
        <span className="text-violet-600">blogging</span>{" "}
        platform.
      </h1>

      {/* Subtext */}
      <p className="text-gray-500 text-sm sm:text-base max-w-md mb-8">
        This is your space to think out loud, to share what matters, and to write without filters.
        Whether it's one word or a thousand, your story starts right here.
      </p>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg bg-white rounded-full shadow-md overflow-hidden border border-gray-100">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) =>dispatch(setInput(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search blogs"
          className="flex-1 px-5 py-3 text-sm text-gray-700 outline-none bg-transparent"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-3 transition-colors"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      <div className="text-center">
        {
        input &&<button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer mt-5">Clear Search</button>
        }
      </div>
    </div>
  );
};

export default Header;