import profileAvatar from "../images/man.png";
import { useState, useEffect } from "react";
import { postRecipe, getRecipesComments,postComment } from "../api/api.js";
export default function RecipeDetail({ id }) {
  const [comment, setComment] = useState("");
  const user = "Phil";
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  useEffect(() => {
    const fetchRecipeComments = async () => {
      try {
        const data = await getRecipesComments(id)
        console.log(data)
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
      id: Date.now().toString(36),
      name: user,
      time: new Date().toISOString().replace("T", " ").slice(0, 16),
      comment,
      avatar: "/user.png",
      rating: null,
    };
// console.log(newComment)
    try {
      const x = await postComment(id, newComment);
      console.log('Created comment, ', x)
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (error) {
      console.log("Error posting comment:", error);
    } finally {
      setIsPosting(false);
    }
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
          name=""
          id=""
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          rows="2"
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
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {c.comment}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
