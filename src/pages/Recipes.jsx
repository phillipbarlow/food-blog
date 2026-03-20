import { useEffect, useState } from "react";
import { getRecipes } from "../api/api.js";
import { useSearchParams } from "react-router-dom";
export default function Recipes() {
  const [apiResponse, setApiResponse] = useState([]);
  const [searchParams, setSearchParms] = useSearchParams();
  const [category, setCategory] = useState(null);
  // console.log(category)
  const urlCategory = searchParams.get("category") || '';
  console.log(urlCategory);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes(category);
        console.log(response)
        setApiResponse(response);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchRecipes();
  }, [category]);

  const handleCategoryChange = (e) =>{
    const newCategory = e.target.value;
    if(newCategory){
      setSearchParms({category:newCategory})
      setCategory(newCategory)
    }else{
      setSearchParms({})
    }
  }
  return (
    <main className="max-w-5xl mx-auto p-6 text-center mt-30">
      <div className="mb-6">
        <select
          className="border rounded p-2"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Recipes</option>
          <option value="baking">Baking</option>
          <option value="cooking">Cooking</option>
        </select>
      </div>
      <h1 className="text-3xl font-bold mb-6">{category}</h1>
      {apiResponse.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        <ul className="md:grid-cols-2 gap-6">
          {apiResponse.recipes.map((r) => (
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
