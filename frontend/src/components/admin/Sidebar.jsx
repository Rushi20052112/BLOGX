import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: assets.home_icon,
    },
    {
      name: "Add blogs",
      path: "/admin/add-blog",
      icon: assets.add_icon,
    },
    {
      name: "Blogs list",
      path: "/admin/list-blogs",
      icon: assets.list_icon,
    },
    {
      name: "Comments",
      path: "/admin/comments",
      icon: assets.comment_icon,
    },
  ];

  return (
    <div className="w-64 bg-white border-r min-h-full p-4">
      
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          end={item.path === "/admin"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 mb-2 rounded-md cursor-pointer transition
             ${
               isActive
                 ? "bg-violet-100 text-violet-600 border-l-4 border-violet-600"
                 : "text-gray-600 hover:bg-gray-100"
             }`
          }
        >
          <img src={item.icon} className="w-5 h-5" />
          <span className="text-sm">{item.name}</span>
        </NavLink>
      ))}

    </div>
  );
};

export default Sidebar;