import profileAvatar from "../images/man.png";
import userAvatar from "../images/user.png";
import { useState, useEffect } from "react";
export default function RecipeDetail() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Kristin W.",
      time: "2 days ago",
      text: "I followed this recipe exactly and the loaf turned out perfectly. Will definitely make it again!",
      avatar: userAvatar,
      rating: 4,
    },
    {
      id: 2,
      name: "Miguel G.",
      time: "5 days ago",
      text: "Great recipe! The sourdough had a nice tangy flavor and a lovely crust.",
      avatar: userAvatar,
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah L.",
      time: "1 week ago",
      text: "Easy to follow instructions and the results were delicious. Thank you!",
      avatar: userAvatar,
      rating: 5,
    },
  ]);
  const handlePost = () => {
    if (comment.trim() === "") return;

    const newComment = {
      id: Date.now(),
      name: "You",
      time: "Just now",
      text: comment,
      avatar: userAvatar,
      rating: null,
    };
    setComments((prevComments) => [newComment, ...prevComments]);
    setComment("");
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
          Post
        </button>
      </div>
      {/* Comment List */}
      <div className="mt-6 space-y-6">
        {comments.map((c) => {
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
                    {c.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
