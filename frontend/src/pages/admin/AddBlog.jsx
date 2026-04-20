import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { blogCategories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
// import { set } from "mongoose";
import toast from "react-hot-toast";
import {marked} from "marked";

const AddBlog = () => {

    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(blogCategories[0]);
    const [isPublished, setIsPublished] = useState(false);

    // Handle image upload
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const generateContent = async () => {
        if (!title) {
            toast.error("Please enter title first")
            return;
        }
        try {
            setLoading(true);
            const { data } = await axios.post("/api/blog/generate", { prompt: title });
            if (data.success) {
                setDescription(marked(data.content));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setIsAdding(true);

            const blog = { title, subTitle, description, category, isPublished }
            const formData = new FormData();
            formData.append("blog", JSON.stringify(blog))
            formData.append("image", image)

            const { data } = await axios.post("/api/blog/add", formData)

            if (data.success) {
                await setImage(null)
                await setPreview(null)
                await setTitle("")
                await setSubTitle("")
                await setDescription("")
                await setCategory('All')
                await toast.success(data.message)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-sm max-w-3xl">

            {/* Upload Thumbnail */}
            <div className="mb-5">
                <p className="text-sm text-gray-600 mb-2">Upload thumbnail</p>

                <div className="relative w-24 h-24">

                    {/* Preview / Upload Box */}
                    <label className="w-full h-full border flex items-center justify-center cursor-pointer rounded-md overflow-hidden">

                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" />
                        ) : (
                            <p className="text-xs text-gray-400">Upload</p>
                        )}

                        <input
                            type="file"
                            onChange={handleImage}
                            hidden
                        />
                    </label>

                    {/* ❌ Remove Image Button */}
                    {preview && (
                        <button
                            onClick={() => {
                                setImage(null);
                                setPreview(null);
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white 
                   rounded-full text-xs flex items-center justify-center 
                   cursor-pointer hover:bg-red-600"
                        >
                            ✕
                        </button>
                    )}

                </div>
            </div>

            {/* Title */}
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Blog title</p>
                <input
                    type="text"
                    placeholder="Type here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-md p-2 outline-none text-sm"
                />
            </div>

            {/* Subtitle */}
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Sub title</p>
                <input
                    type="text"
                    placeholder="Type here"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    className="w-full border rounded-md p-2 outline-none text-sm"
                />
            </div>

            <div className="mb-4 relative">
                <p className="text-sm text-gray-600 mb-3">Blog description</p>
                <div className="mb-4 relative">
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        className=" bg-white [&_.ql-editor]:min-h-[250px]"
                    />

                    {/* AI Button */}
                    {loading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 rounded-md">
                            <div className="w-10 h-10 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <button
                        disabled={loading}
                        onClick={generateContent}
                        className="absolute bottom-3 right-3 px-3 py-1 text-xs 
               bg-gray-700 text-white rounded-md 
               hover:bg-gray-800 transition cursor-pointer"
                    >
                        Generate with AI
                    </button>
                    </div>
            </div>
            {/* Category */}
            <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Blog category</p>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-md p-2 text-sm"
                >
                    {blogCategories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Publish */}
            <div className="flex items-center gap-2 mb-5">
                <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={() => setIsPublished(!isPublished)}
                />
                <p className="text-sm text-gray-600">Publish Now</p>
            </div>

            {/* Submit */}
            <button
                disabled={isAdding}
                onClick={handleSubmit}
                className="px-6 py-2 bg-violet-600 text-white rounded-md 
                   hover:bg-violet-700 transition"
            >
                {isAdding ? "Adding..." : "Add Blog"}
            </button>

        </div>
    );
};

export default AddBlog;