import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
// import { fetchBlogs } from "../../pages/admin/ListBlog";

const BlogTableItem = ({ blog,  index, fetchBlogs }) => {

  const { axios } = useAppContext()

  const deleteBlog = async (e) => {
    const confirm = window.confirm("Are you sure you want to delete this blog?")
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const togglePublish = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  }
  return (
    <tr className="border-b text-sm text-gray-600">

      <td className="py-3 px-2">{index + 1}</td>

      <td className="py-3 px-2">{blog.title}</td>

      <td className="py-3 px-2">
        {new Date(blog.createdAt).toDateString()}
      </td>

      <td className="py-3 px-2">
        <span className={blog.isPublished ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </span>
      </td>

      <td className="py-3 px-2 flex items-center gap-2">

        <button onClick={togglePublish} className="px-3 py-1 border rounded text-xs hover:bg-gray-100">
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>

        <img
          src={assets.cross_icon}
          className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100"
          onClick={deleteBlog}
        />
      </td>

    </tr>
  );
};

export default BlogTableItem;