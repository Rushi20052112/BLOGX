import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/slices/authSlice";


const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {axios} = useAppContext();

    const handleLogout = () => {
        dispatch(clearToken());  // handles localStorage + state in one shot
        navigate("/");
        toast.success("Logged out successfully")
    };

    return (
        <div className="flex flex-col min-h-screen">

            {/* Navbar */}
            <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <img src={assets.symbol} className="w-6 h-6" />
                    <h1 className="font-semibold text-gray-800">BlogX</h1>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="px-5 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 
                     text-white rounded-full text-sm cursor-pointer"
                >
                    Logout
                </button>
            </div>

            {/* Main Layout */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <Sidebar />

                {/* Content */}
                <div className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default Layout;