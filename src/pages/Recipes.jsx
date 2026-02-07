import { useEffect, useState } from "react";
import {getRecipes} from "../api/api.js"
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = getRecipes();
        setRecipes(allRecipes);
        // console.log(allRecipes)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchRecipes();
  }, []);
  
  return (
    <main className="max-w-5xl mx-auto p-6 text-center mt-30">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        <ul className="md:grid-cols-2 gap-6">
          {recipes.map((r) => (
              // console.log(r)
            <li key={r.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <h2 className="text-xl font-semibold">{r.title}</h2>
              <p className="text-sm text-gray-600">{r.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
