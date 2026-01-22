import profileAvatar from "../images/man.png";
import { useState, useEffect } from "react";
export default function RecipeDetail({id}) {
  const [comment, setComment] = useState("");
  const user = "Phil"
  const [comments, setComments] = useState([]);
  useEffect(() => {
    
  const fetchRecipeComments = async () => {
    try {
      const res = await fetch(`http://localhost:5001/recipes/${id}/comments`);
      const data = await res.json();
      console.log(data,'line 13 data from fetch!!!')
      setComments(data)
      // console.log(data[0].comment, " line 52 comment section");
    } catch (error) {
      console.log("Error from fetching recipes own comments ", error);
    }
  };
  fetchRecipeComments();
},[id]);
  const handlePost = () => {
    if (comment.trim() === "") return;

    const newComment = {
      id: Date.now().toString(36),
      name: user,
      time: new Date().toISOString().replace("T", " ").slice(0, 16),
      comment,
      avatar: "/user.png",
      rating: null,
    };
    // console.log(newComment,' -- line 59')
    setComments((prevComments) => [newComment, ...prevComments]);
    setComment("");
  };
  // console.log(comments,' line 58 ---')
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
        
        {comments.length > 0 && comments.map((c) => {
          // console.log(c,'-- from inside of map')
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
