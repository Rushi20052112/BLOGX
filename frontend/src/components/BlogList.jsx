import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogCategories, blog_data } from "../assets/assets";
import BlogCard from "./BlogCard";
// import { useAppContext } from "../context/AppContext";
import { useSelector } from "react-redux";

const BlogList = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const blogs = useSelector((state) => state.blog.blogs);
  const input = useSelector((state) => state.blog.input);

  const filteredBlogs = () => {
    let filtered = blogs;

    // Category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (blog) =>
          blog.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search filter
    if (input.trim() !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Category Filter */}
      <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
        {blogCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === category
              ? "bg-violet-600 text-white shadow-md"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredBlogs().map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default BlogList;