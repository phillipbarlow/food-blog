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
  // console.log(id)
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
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="lex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
          {/* <span>Prep: {prepTime} min</span> */}
          {/* <span>Serves: {servings}</span> */}
        </div>
        <Link
          to={`/recipes/${id}`}
          className="mt-3 inline-block bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-600 transition"
          >
          View Recipe →
        </Link>
        {/* likes and comments section */}
        <div className="mt-4 flex items-center gap-6 pt-3 text-sm text-slate-500">
          {/* comments */}
          <button className="flex items-center gap-2 hover:text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.6"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10.5h8M8 14h4M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5.172a2 2 0 0 0-1.414.586L9 20.999 9.001 18H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                />
            </svg>
            <span>31</span>
          </button>
          {/* likes */}
          <button className="flex items-center gap-2 hover:text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.6"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21 4.318 12.682a4.5 4.5 0 0 1 0-6.364z"
                />
            </svg>
            <span>153</span>
          </button>
        </div>
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
