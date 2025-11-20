import { useParams, Link } from "react-router-dom";
import { recipes } from "../data/recipes";
import CommentSection from "../components/CommentSection"
export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="text-lg">Recipe not found.</p>
        <Link to="/" className="text-emerald-600">
          Back Home
        </Link>
      </main>
    );
  }
  return (
    <main className="max-w-5xl mx-auto p-6 bg-gray-50 lg:rounded-xl pt-18 lg:mt-12">
      {/* Main page */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full rounded-xl  object-cover"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            {recipe.title}
          </h1>
          <p className="text-gray-700 mb-4">{recipe.description}</p>
          <div className="text-sm text-gray-500 mb-6">
            <span className="mr-4">Prep: {recipe.prepTime} min</span>
            <span>Serves: {recipe.servings}</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 ">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-1 mb-6 text-gray-800">
            {recipe.ingredients.map((ingred, i) => (
              <li key={i}>{ingred}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2 ">Steps</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-800">
            {recipe.steps.map((steps, i) => (
              <li key={i}>{steps}</li>
            ))}
          </ol>
          <Link className="inline-block mt-8 text-emerald-600 underline" to="/">
            ← Back to recipes
          </Link>
        </div>
      </div>
      <CommentSection/>
    </main>
  );
}
