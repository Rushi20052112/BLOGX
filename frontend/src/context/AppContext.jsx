import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, setBlogLoading, setBlogError } from "../store/slices/blogSlice";
import toast from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const token = localStorage.getItem("token");
// if (token) {
//   axios.defaults.headers.common["Authorization"] = token;
// }

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const dispatch = useDispatch();

//   // Keep axios auth header in sync with Redux token
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = token;
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//     }
//   }, [token]);

  const fetchBlogs = async () => {
    dispatch(setBlogLoading(true));
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        dispatch(setBlogs(data.blogs));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(setBlogError(error.message));
      toast.error(error.message);
    } finally {
      dispatch(setBlogLoading(false));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const value = { axios, fetchBlogs };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);