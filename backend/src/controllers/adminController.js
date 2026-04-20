import jwt from "jsonwebtoken";
import { Blog } from "../models/blog.js";
import { Comment } from "../models/comment.js";


export const adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.status(200).json({ message: "Admin login successful", token });
        } else {
            res.status(401).json({ message: "Invalid admin credentials" });
        }
    } catch (error) {
        console.log("Error during admin login:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 })
        res.status(200).json({ success: true, blogs })
    } catch (error) {
        console.error("Error fetching all blogs:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 })
        res.status(200).json({ success: true, comments })
    } catch (error) {
        console.error("Error fetching all comments:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5)
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({ isPublished: false })

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.status(200).json({ success: true, dashboardData })
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Comment deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body
        await Comment.findByIdAndUpdate(id, { isApproved: true })
        res.status(200).json({ success: true, message: "Comment approved successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}