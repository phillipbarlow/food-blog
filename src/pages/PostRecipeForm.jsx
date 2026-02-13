import { useState } from "react";
import "../styles/recipeForm.css";
import { postRecipe } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/uploadToCloudinary.js";
import { shrink } from "../utils/shrink.js";
export default function PostRecipeForm() {
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [category, setCategory] = useState("cooking");
  const [title, setTitle] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if(!file) return;

    const smallFile = await shrink(file)
    const url = await uploadImageToCloudinary(smallFile);
    setImageFile(url);

    console.log("Uploaded image URL:", url);
  }

  function handleIngredientChange(value, index) {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  }

  function addIngredient() {
    setIngredients((curr) => [...curr, ""]);
  }

  function removeIngredient(index) {
    setIngredients((curr) => curr.filter((_, i) => i !== index));
  }
  function handleStepChange(value, index) {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  }

  function addStep() {
    setSteps((curr) => [...curr, ""]);
  }

  function removeStep(index) {
    setSteps((curr) => curr.filter((_, i) => i !== index));
  }
  function clearAll() {
    setTitle("");
    setSteps([""]);
    setIngredients([""]);
  }
  const handlePost = async (pay) => {
    try {
      const response = await postRecipe(pay);
      navigate(`/recipes/${response.recipe.id}`);
    } catch (err) {
      console.log("Error from handlePost", err);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile);
      }
      const trimmerTitle = title.trim();
      const trimmedIngredients = ingredients
        .map((i) => i.trim())
        .filter((item) => item !== "");
      const trimmedInstructions = steps
        .map((i) => i.trim())
        .filter((item) => item !== "");

      const payLoad = {
        title: trimmerTitle,
        ingredients: trimmedIngredients,
        instructions: trimmedInstructions,
        category,
        image: imageUrl || null,
      };

      handlePost(payLoad);
    } catch (err) {
      console.log("Error submitting recipe:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="recipe-form-page">
      <form className="recipe-form mt-12" onSubmit={handleSubmit}>
        <h1 className="form-title">Add New Recipe</h1>
        <section className="form-section">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            type="text"
            className="text-input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </section>
        {/* Ingredients */}
        <section className="form-section">
          <label htmlFor="ingredient-0" className="field-label">
            Ingredients
          </label>

          <div className="dynamic-list">
            {ingredients.map((item, index, arr) => (
              <div className="dynamic-list-row" key={index}>
                <input
                  id={`ingredient-${index}`}
                  type="text"
                  className="text-input"
                  placeholder={`Ingredient ${index + 1}`}
                  value={item}
                  onChange={(e) =>
                    handleIngredientChange(e.target.value, index)
                  }
                  onKeyDown={(e) => {
                    const last = arr.at(-1);
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (last.trim() !== "") {
                        addIngredient();
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  className="icon-button icon-button--danger"
                  aria-label={`Remove ingredient ${index + 1}`}
                  onClick={() => {
                    if (item.trim() !== "") {
                      removeIngredient(index);
                    }
                  }}
                >
                  ✖
                </button>
              </div>
            ))}

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                const last = ingredients.at(-1);
                if (!last?.trim()) return;
                addIngredient();
              }}
            >
              + Add ingredient
            </button>
          </div>
        </section>

        {/* Instructions / Steps */}
        <section className="form-section">
          <label htmlFor="instruction-0" className="field-label">
            Instructions
          </label>

          <div className="dynamic-list">
            {steps.map((item, index, arr) => (
              <div className="dynamic-list-row" key={index}>
                <input
                  id={`instruction-${index}`}
                  type="text"
                  className="text-input"
                  placeholder={`Step ${index + 1}`}
                  value={item}
                  onChange={(e) => handleStepChange(e.target.value, index)}
                  onKeyDown={(e) => {
                    const last = arr.at(-1);
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (last.trim() !== "") {
                        addStep();
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  className="icon-button icon-button--danger"
                  aria-label={`Remove step ${index + 1}`}
                  onClick={() => {
                    if (item.trim() !== "") {
                      removeStep(index);
                    }
                  }}
                >
                  ✖
                </button>
              </div>
            ))}

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                const last = steps.at(-1);
                if (!last?.trim()) return;
                addStep();
              }}
            >
              + Add step
            </button>
          </div>
        </section>

        {/* Category */}
        <section className="form-section">
          <label htmlFor="category" className="field-label">
            Recipe type
          </label>
          <select
            id="category"
            name="category"
            className="select-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="cooking">Cooking recipe</option>
            <option value="baking">Baking recipe</option>
          </select>
        </section>
        <section>
          {loading && <p className="text-sm text-gray-600 mt-1">...Loading</p>}
          {error && <p className="text-sm text-red-600 mt-1">Error: {error}</p>}
          <input
            type="file"
            onChange={handleImageUpload}
          />

          {imageFile && (
            <p className="text-sm text-gray-600 mt-1">
              Selected file: {imageFile.name}
            </p>
          )}
        </section>

        <div className="form-actions">
          <button type="button" className="clear-button" onClick={clearAll}>
            Clear all
          </button>
          <button type="submit" className="primary-button">
            Save recipe
          </button>
        </div>
      </form>
    </main>
  );
}
