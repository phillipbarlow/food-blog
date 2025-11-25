import { useEffect } from "react";
export default function Recipes() {
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:5001/recipes");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = res.json();
        console.log("Recipes: ", data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchRecipes();
  }, []);

  return <div></div>;
}
