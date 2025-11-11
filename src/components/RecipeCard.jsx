import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function RecipeCard({
  id,
  title,
  image,
  description,
  prepTime,
  servings,
  alt,
}) {
  // console.log(title)
  return (
    <div className="group overflow-hidden rounded-xl shadow-md bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full 
              h-[250px] 
              sm:h-[280px] 
              md:h-80 
              lg:h-[350px] 
              object-cover 
              hover:scale-105 
              transition-transform 
              duration-300"
        />
      </div>
      <div className="p-5 space-y-2"
      >
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="lex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
          <span>Prep: {prepTime} min</span>
          <span>Serves: {servings}</span>
        </div>
        <Link
          to={`/recipes/${id}`}
          className="mt-3 inline-block bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-600 transition"
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  prepTime: PropTypes.number,
  servings: PropTypes.number,
  alt: PropTypes.string,
};
