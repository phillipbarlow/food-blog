export default function RecipeCard({
  key,
  img,
  title,
  description,
  prepTime,
  servings,
  alt,
}) {
  return (
    <div>
      <div>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
}
