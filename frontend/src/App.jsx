import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import { Navigate } from "react-router-dom";
import Login from './pages/admin/Login'
import { useSelector } from 'react-redux'




const App = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
        <Route path="/admin" element={token?<Layout />:<Login />} >
            <Route index element={<Dashboard />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="list-blogs" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
