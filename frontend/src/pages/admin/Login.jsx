import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { setToken } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const navigate = useNavigate();

  const {axios} = useAppContext();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/admin/login", { email, password });
      if (data.token) {
        dispatch(setToken(data.token));
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border">

        <h1 className="text-2xl font-semibold text-center mb-2">
          <span className="text-violet-600">Admin</span> Login
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your credentials to access the admin panel
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b p-2 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b p-2 outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                     text-white rounded-md hover:opacity-90 transition"
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;