import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(99,74,246,0.13)" }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block bg-violet-100 text-violet-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {blog.category}
        </span>

        {/* Title */}
        <h3 className="text-gray-900 font-semibold text-sm leading-snug mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {/* Subtitle */}
        <p className="text-gray-400 text-xs line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.subTitle }} >
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;