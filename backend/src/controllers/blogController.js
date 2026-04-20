import fs from "fs"
import { Blog } from "../models/blog.js"
import imageKit from "../config/imageKit.js"
import { json } from "stream/consumers"
import { Comment } from "../models/comment.js"
import main from "../config/gemini.js"

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        const imageFile = req.file

        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [{
                quality: "auto",
                format: "webp",
                width: 1280
            }]
        })

        const image = optimizedImageUrl

        await Blog.create({ title, subTitle, description, category, image, isPublished })
        res.status(201).json({success:true, message: "Blog added successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const getAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find({isPublished:true})
        res.status(200).json({success:true, blogs})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message:error.message })
    }
}

export const getBlogById=async(req,res)=>{
    try {
        const {blogId}=req.params
        const blog=await Blog.findById(blogId)
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
        res.status(200).json({success:true,blog})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message:error.message })
    }
}

export const deleteBlogById=async(req,res)=>{
    try {
        const {id}=req.body
        await Blog.findByIdAndDelete(id)
        await Comment.deleteMany({blog:id})
        res.status(200).json({success:true,message:"Blog deleted succesfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message:error.message })
    }
}

export const togglePublish=async(req,res)=>{
    try {
        const {id}=req.body
        const blog=await Blog.findById(id)
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }   
        blog.isPublished=!blog.isPublished
        await blog.save()
        res.status(200).json({success:true,message:"Blog publish status toggled successfully"})    
    } catch (error) {
        console.error(error)
        res.status(500).json({ message:error.message })
    }
}

export const addComment=async(req,res)=>{
    try {
        const {blog,name,content}=req.body
        await Comment.create({blog,name,content})
        res.status(201).json({success:true,message:"Comment added successfully"})
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

export const getBlogComments=async(req,res)=>{
    try {
        const {blogId}=req.body
        const comments=await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1})

        res.status(200).json({success:true, comments})
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}

export const generateContent=async(req,res)=>{
    try {
        const {prompt}=req.body
        const content=await main(prompt + 'Generate a blog content for this topic in simple text format')
        res.status(200).json({success:true, content})
    } catch (error) {
        res.status(500).json({ message:error.message })
    }
}