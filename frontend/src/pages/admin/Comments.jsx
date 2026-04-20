import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [activeTab, setActiveTab] = useState("notApproved");

    const { axios } = useAppContext();

    // Fetch Comments
    const fetchComments = async () => {
        try {
            const { data } = await axios.get("/api/admin/comments");

            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    // Approve Comment
    const approveComment = async (id) => {
        try {
            const { data } = await axios.post("/api/admin/approve-comment", {
                id,
            });

            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Delete Comment
    const deleteComment = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) return;

        try {
            const { data } = await axios.post("/api/admin/delete-comment", {
                id,
            });

            if (data.success) {
                toast.success(data.message);
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Filter comments
    const filteredComments = comments.filter((item) =>
        activeTab === "approved" ? item.isApproved : !item.isApproved
    );

    return (
        <div className="bg-white p-5 rounded-md shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-700 text-lg">Comments</h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab("approved")}
                        className={`px-3 py-1 text-sm rounded-md border ${activeTab === "approved"
                            ? "bg-violet-600 text-white"
                            : "text-gray-600"
                            }`}
                    >
                        Approved
                    </button>

                    <button
                        onClick={() => setActiveTab("notApproved")}
                        className={`px-3 py-1 text-sm rounded-md border ${activeTab === "notApproved"
                            ? "bg-violet-600 text-white"
                            : "text-gray-600"
                            }`}
                    >
                        Not Approved
                    </button>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 text-sm text-gray-500 border-b pb-2">
                <p>BLOG TITLE & COMMENT</p>
                <p>DATE</p>
                <p className="text-center">ACTIONS</p>
            </div>

            {/* Comments */}
            {filteredComments.map((item) => (
                <div
                    key={item._id}
                    className="grid grid-cols-3 gap-4 border-b py-4 text-sm text-gray-600"
                >
                    {/* Blog + Comment */}
                    <div>
                        <p>
                            <span className="font-medium">Blog:</span>{" "}
                            {item.blog?.title || "Deleted Blog"}
                        </p>

                        <p className="mt-2">
                            <span className="font-medium">Name:</span> {item.name}
                        </p>

                        <p className="mt-1">
                            <span className="font-medium">Comment:</span> {item.content}
                        </p>
                    </div>

                    {/* Date */}
                    <div>{new Date(item.createdAt).toDateString()}</div>

                    {/* Actions */}
                    <div className="flex justify-center gap-4">
                        {item.isApproved ? (
                            <button className="px-3 py-1 h-9 text-xs rounded-full bg-green-100 text-green-700 border border-green-200 cursor-default">
                                ✓ Approved
                            </button>
                        ) : (
                            <img
                                onClick={() => approveComment(item._id)}
                                src={assets.tick_icon}
                                alt="approve"
                                className="w-6 h-6 cursor-pointer"
                            />
                        )}

                        <img
                            onClick={() => deleteComment(item._id)}
                            src={assets.bin_icon}
                            alt="delete"
                            className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;