// import profileAvatar from "../images/user.png";
import { useState, useEffect } from "react";
import { postComment, deleteComment, updateComment } from "../api/api.js";
import { useAuth } from "../hooks/userAuth.js";
import ConfirmDelete from "./ConfirmDelete.jsx";
import PropTypes from "prop-types";

export default function CommentSection({ recipeId, allComments }) {
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchRecipeComments = async () => {
      try {
        setComments(allComments);
      } catch (error) {
        console.log("Error from fetching recipes comments ", error);
      }
    };
    // console.log(allComments);
    fetchRecipeComments();
  }, [recipeId, allComments]);
  
  // console.log(allComments)
  const handlePost = async () => {
    if (comment.trim() === "") return;
    setIsPosting(true);
    const newComment = {
      userId: user.id,
      displayName: user.displayName,
      username: user.username,
      time: new Date().toISOString().replace("T", " ").slice(0, 16),
      comment,
      rating: null,
    };
    try {
      const created = await postComment(recipeId, newComment);
      setComments((prevComments) => [created, ...prevComments]);
      setComment("");
    } catch (error) {
      console.log("Error posting comment:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setLoading(true);
      await deleteComment(recipeId, commentId);
      setComments((curr) => curr.filter((comment) => comment.id !== commentId));
      setOpen(false);
      setCommentToDelete(null);
    } catch (err) {
      console.log("Error from handle delete ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSaveEdit = async (editId) => {
    try {
      await updateComment(recipeId, editId, { comment: editValue });
    } catch (err) {
      console.log("Error from handleUpdateComment ", err);
    }
    setComments((curr) =>
      curr.map((i) => (i.id === editId ? { ...i, comment: editValue } : i)),
    );
    setEditingId(null);
    setEditValue("");
  };

  const startEditing = (data) => {
    setEditingId(data.id);
    setEditValue(data.comment);
  };

  return (
    <div className="mt-12 w-full  max-w-3xl ">
      <h2 className="  text-3xl font-semibold tracking-tight text-slate-900 mb-4">
        Comments
      </h2>
      {/* Add comment */}
      {isAuthenticated && <div className="flex gap-3 items-start bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <textarea
          className="flex-1 resize-none border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows="2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handlePost();
            }
          }}
        />
        <button
          onClick={() => handlePost()}
          className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
        >
          {isPosting ? "Posting" : "Post"}
        </button>
      </div>}
      {/* Comment List */}
      <div className="mt-6 space-y-6">
        {comments.length > 0 &&
          comments.map((c) => {
            const isEditing = editingId === c.id;
            return (
              <div key={c.id} className="flex items-start gap-4">
                <img
                  src={c.avatar}
                  alt={c.user}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-slate-900">{c.username}</p>
                    <span className="text-sm text-slate-500">{c.time}</span>
                    {isAuthenticated && user.id === c.user_id && (
                      <button
                        type="button"
                        // onClick={() => handleDeleteComment(c.id)}
                        onClick={() => {
                          setOpen(true);
                          setCommentToDelete(c.id);
                        }}
                        className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 h-fit transition-colors"
                        aria-label={`Delete comment from ${c.name}`}
                      >
                        Delete comment
                      </button>
                    )}
                    <ConfirmDelete
                      isOpen={open}
                      onCancel={() => setOpen(false)}
                      onConfirm={() => {
                        handleDeleteComment(commentToDelete);
                      }}
                      loading={loading}
                      title="Delete comment"
                    />
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        className="w-full"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />

                      <button
                        className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 h-fit transition-colors"
                        onClick={() => {
                          console.log(c.id, "--from edit");
                          handleSaveEdit(c.id);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 h-fit transition-colors"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {c.comment}
                      </p>
                      {isAuthenticated && user.id === c.user_id && (
                        <button
                          className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 h-fit transition-colors"
                          onClick={() => startEditing(c)}
                        >
                          Edit
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
CommentSection.propTypes = {
  allComments: PropTypes.array.isRequired,
  recipeId: PropTypes.array.isRequired,
};
