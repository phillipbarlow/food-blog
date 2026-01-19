import { useEffect, useState } from "react";
// import { recipes } from "../data/recipes";
import RecipeCard from "./RecipeCard";
import { getRecipes } from "../api/api";
export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState([])
  useEffect(() => {
    const fetchRecipes = () => {
      getRecipes()
      .then((res)=>{
        setRecipes(res)
      })
    };
    fetchRecipes();
  }, []);
// store results into useState
// replace line 24 map with contents of useState
  return (
    
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-10">
          Featured recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3 ">
          {recipes.map((r) => (
            <div key={r.id} className="overflow-hidden rounded-xl shadow-md">
              <RecipeCard
                key={r.id}
                id={r.id}
                title={r.title}
                image={r.image}
                description={r.description}
                prepTime={r.prepTime}
                servings={r.servings}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
