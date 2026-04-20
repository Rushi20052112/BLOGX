import { useEffect, useState } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {

  const {axios} = useAppContext()

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboardData=async()=>{
    try {
      const {data}=await axios.get("/api/admin/dashboard")
      data.success?setDashboardData(data.dashboardData):toast.error(data.message);

    } catch (error) {
      toast.error(error.message);  
    }
  }

  useEffect(()=>{
    fetchDashboardData();
  }, [])

  return (
    <div>

      {/* Top Cards */}
      <div className="flex gap-4 mb-8 flex-wrap">
        
        {/* Blogs */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-md shadow-sm w-48">
          <img src={assets.dashboard_icon_1} className="w-10 h-10" />
          <div>
            <p className="text-lg font-semibold">{dashboardData.blogs}</p>
            <p className="text-sm text-gray-500">Blogs</p>
          </div>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-md shadow-sm w-48">
          <img src={assets.dashboard_icon_2} className="w-10 h-10" />
          <div>
            <p className="text-lg font-semibold">{dashboardData.comments}</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-md shadow-sm w-48">
          <img src={assets.dashboard_icon_3} className="w-10 h-10" />
          <div>
            <p className="text-lg font-semibold">{dashboardData.drafts}</p>
            <p className="text-sm text-gray-500">Drafts</p>
          </div>
        </div>

      </div>

      {/* Latest Blogs Table */}
      <div className="bg-white p-5 rounded-md shadow-sm">

        <div className="flex items-center gap-2 mb-4">
          <img src={assets.dashboard_icon_4} className="w-5 h-5" />
          <h2 className="font-semibold text-gray-700">Latest Blogs</h2>
        </div>

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
            {dashboardData.recentBlogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                index={index}
                fetchBlogs={fetchDashboardData}
              />
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Dashboard;