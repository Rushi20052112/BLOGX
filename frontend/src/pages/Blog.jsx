import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import moment from "moment";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Fetch Single Blog
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);

      if (data.success) {
        setBlog(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch Comments
  const fetchCommentsData = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", {
        blogId: id,
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add Comment
  const handleSubmit = async () => {
    if (!name || !comment) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content: comment,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setComment("");
        await fetchCommentsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      await fetchBlogData();
      await fetchCommentsData();
      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) return <Loader />;
  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 relative">
        {/* Background */}
        <img
          src={assets.gradientBackground}
          className="absolute top-0 left-0 -z-10 opacity-50"
          alt=""
        />

        {/* Date */}
        <p className="text-center text-sm mb-2 text-violet-600">
          Published on {moment(blog.createdAt).format("DD MMM YYYY")}
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-3">
          {blog.title}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-500 mb-6">
          {blog.subTitle}
        </p>

        {/* Author */}
        <div className="flex justify-center mb-8">
          <span className="px-4 py-1 border border-violet-500 text-violet-600 rounded-full text-sm">
            BlogX Admin
          </span>
        </div>

        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-xl mb-8"
        />

        {/* Description */}
        <div
          className="rich-text prose lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>

        {/* Comments */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-5">
            Comments ({comments.length})
          </h2>

          <div className="space-y-4">
            {comments.map((item) => (
              <div
                key={item._id}
                className="flex justify-between bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex gap-3">
                  <img
                    src={assets.user_icon}
                    className="w-7 h-7"
                    alt=""
                  />

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.content}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  {moment(item.createdAt).fromNow()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            Add your comment
          </h2>

          <input
            type="text"
            placeholder="Your name"
            className="w-full border p-3 rounded-md mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            rows="5"
            placeholder="Write comment..."
            className="w-full border p-3 rounded-md mb-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md"
          >
            Submit
          </button>
        </div>

        {/* Share */}
        <div className="mt-10">
          <p className="text-sm text-gray-500 mb-3">
            Share this blog
          </p>

          <div className="flex gap-4">
            <img src={assets.facebook_icon} className="w-10 cursor-pointer" />
            <img src={assets.twitter_icon} className="w-10 cursor-pointer" />
            <img src={assets.googleplus_icon} className="w-10 cursor-pointer" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;