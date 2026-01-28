import profileAvatar from "../images/man.png";
import { useState, useEffect } from "react";
import {
  getRecipesComments,
  postComment,
  deleteComment,
  updateComment,
} from "../api/api.js";

export default function RecipeDetail({ id }) {
  const user = "Phil";
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchRecipeComments = async () => {
      try {
        const data = await getRecipesComments(id);
        setComments(data);
      } catch (error) {
        console.log("Error from fetching recipes own comments ", error);
      }
    };
    fetchRecipeComments();
  }, [id]);

  const handlePost = async () => {
    if (comment.trim() === "") return;
    setIsPosting(true);
    const newComment = {
      name: user,
      time: new Date().toISOString().replace("T", " ").slice(0, 16),
      comment,
      avatar: "/user.png",
      rating: null,
    };
    try {
      const created = await postComment(id, newComment);
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
      await deleteComment(commentId);
      setComments((curr) => curr.filter((comment) => comment.id !== commentId));
    } catch (err) {
      console.log("Error from handle delete ", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSaveEdit = async (editId) => {
    console.log(id,editId);
    // const newComment = {comment:editValue}
    try {
      const res = await updateComment(id, editId, {comment:editValue});
      console.log(res)
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
    console.log(data, "--from 75");
    setEditingId(data.id);
    setEditValue(data.comment);
  };

  return (
    <div className="mt-12 w-full  max-w-3xl ">
      <h2 className="  text-3xl font-semibold tracking-tight text-slate-900 mb-4">
        Comments
      </h2>
      {/* Add comment */}
      <div className="flex gap-3 items-start bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <img src={profileAvatar} alt="Default avatar" className="h-10 w-10" />
        <textarea
          className="flex-1 resize-none border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows="2"
          onKeyDown={(e) => {
            // console.log(e.key)
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
      </div>
      {/* Comment List */}

      <div className="mt-6 space-y-6">
        {comments.length > 0 &&
          comments.map((c) => {
            // console.log(c);
            const isEditing = editingId === c.id;
            return (
              <div key={c.id} className="flex items-start gap-4">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <span className="text-sm text-slate-500">{c.time}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(c.id)}
                      className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 h-fit transition-colors"
                      aria-label={`Delete comment from ${c.name}`}
                    >
                      Delete comment
                    </button>
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
                        onClick={() => handleSaveEdit(c.id)}
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
                      <button
                        className="ml-4 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 h-fit transition-colors"
                        // onClick={() => setEditComment(c.id)}
                        onClick={() => startEditing(c)}
                      >
                        Edit
                      </button>
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
