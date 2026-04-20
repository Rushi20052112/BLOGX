import { useEffect, useState } from "react";
import { blog_data, assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {

  const [blogs, setBlogs] = useState([])

  const { axios } = useAppContext()

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs")
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [])

  return (
    <div className="bg-white p-5 rounded-md shadow-sm">

      {/* Heading */}
      <div className="flex items-center gap-2 mb-4">
        <img src={assets.dashboard_icon_4} className="w-5 h-5" />
        <h2 className="font-semibold text-gray-700">All Blogs</h2>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse">

        {/* Table Head */}
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-2 px-2">#</th>
            <th className="py-2 px-2">BLOG TITLE</th>
            <th className="py-2 px-2">DATE</th>
            <th className="py-2 px-2">STATUS</th>
            <th className="py-2 px-2">ACTIONS</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {blogs.map((blog, index) => (
            <BlogTableItem
              key={blog._id}
              blog={blog}
              index={index}
              fetchBlogs={fetchBlogs}
            />
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default ListBlog;