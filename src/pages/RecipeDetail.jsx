import { useParams, Link, data } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { useEffect, useState } from "react";
import { deleteRecipe } from "../api/api.js";
import { useAuth } from "../hooks/userAuth.js";
export default function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  // console.log(user)
  useEffect(() => {
    setLoading(true);
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5001/recipes/${id}`);
        console.log(id);
        if (!res.ok) {
          setRecipe(null);
          return;
        }
        let data = await res.json();
        data = data.recipe;
        data.instructions = JSON.parse(data.instructions);
        console.log(data);
        setRecipe(data);
      } catch (error) {
        console.log("fetch error ", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      setRecipe(null);
    } catch (err) {
      console.log("Deleting error ", err);
    }
  };

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
    console.log(recipe)
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
            {isAuthenticated && user?.username === recipe.created_by && (
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-3 px-6 mx-auto rounded-b-2xl md:rounded-xl text-1xl block tracking-wide hover:bg-red-400"
              >
                Delete recipes
              </button>
            )}
          {/* </div> */}

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
            {/* <ul className="list-disc pl-5 space-y-1 mb-6 text-gray-800">
            {recipe.map((ingred, i) => (
              <li key={i}>{ingred}</li>
            ))}
          </ul> */}
            {/* <h2 className="text-xl font-semibold mb-2 ">Steps</h2> */}
            {/* <ol className="list-decimal pl-5 space-y-2 text-gray-800">
            {recipeId.steps.map((steps, i) => (
              <li key={i}>{steps}</li>
            ))} 
          </ol>) */}
            <Link
              className="inline-block mt-0 text-emerald-600 underline"
              to="/"
            >
              ← Back to recipes
            </Link>
          </div>
        </div>
        <CommentSection id={id} />
      </main>

      // }
    );
  }
}
