import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { useEffect, useState } from "react";
import { deleteRecipe,updateLike, getRecipeLikes } from "../api/api.js";
import { useAuth } from "../hooks/userAuth.js";
export default function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [like, setLike] = useState(0)
  const { recipeId } = useParams();
  // console.log(useParams())
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5001/recipes/${recipeId}`);
        const likeRes = await getRecipeLikes(recipeId)
        const likeCount = Number(likeRes.likes)
        console.log(likeCount)
        if (!res.ok) {
          setRecipe(null);
          return;
        }
        const json = await res.json();
        let recipeData = json.recipe;

        recipeData.instructions = JSON.parse(recipeData.instructions);
        
        setRecipe(recipeData);
        setLike(likeCount)
      } catch (error) {
        console.log("fetch error ", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId);
      setRecipe(null);
    } catch (err) {
      console.log("Deleting error ", err);
    }
  };

  const handleLike = async ()=>{
    try{
      const likeRes = await updateLike(recipeId)
      setLike(likeRes.likes)
      console.log(likeRes)
    }catch(err){
      console.log("Update like error ", err)
    }
  }

  if (isLoading) {
    return (
      <main>
        <p>Loading!</p>
      </main>
    );
  }
  if (recipe === null) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="text-lg">Recipe not found.</p>
        <Link to="/" className="text-emerald-600">
          Back Home
        </Link>
      </main>
    );
  } else {
    // console.log(recipe)
    return (
      <main className="max-w-5xl mx-auto p-6 bg-gray-50 lg:rounded-xl pt-18 lg:mt-12">
        {/* Main page */}
        <div className="grid md:grid-cols-2 sm:gap-0 xl:gap-8 items-start">
          {/* <div className="space-y-4"> */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full rounded-xl  object-cover"
            />
            {isAuthenticated && user.id === recipe.user_id && (
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-3 px-6 mx-auto rounded-b-2xl md:rounded-xl text-1xl block tracking-wide hover:bg-red-400"
              >
                Delete recipes
              </button>
            )}

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              {recipe.title}
            </h1>
            <p className="text-gray-700 mb-4">{recipe.dekcription}</p>
            <div className="text-sm text-gray-500 mb-6">
              <span className="mr-4">Prep: {recipe.prepTime} min</span>
              <span>Serves: {recipe.servings}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2 ">Ingredients</h2>
            <p>{recipe.created_by}</p>
            
            <Link
              className="inline-block mt-0 text-emerald-600 underline"
              to="/"
            >
              ← Back to recipes
            </Link>
          </div>
        </div>
        <div>
          <button onClick={handleLike}>❤️</button>
          <section>Like count: {like}</section>
        </div>
        <CommentSection recipeId={recipeId} />
      </main>

      // }
    );
  }
}
