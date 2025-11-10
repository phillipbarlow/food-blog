import {recipes} from "../data/recipes"

export default function FeaturedRecipes() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-10">
          Featured recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3 ">
          {recipes.map((img) => (
            <div key={img.id} className="overflow-hidden rounded-xl shadow-md">
              <img
                src={img.src}
                alt={img.alt}
                className="
              w-full 
              h-[250px] 
              sm:h-[280px] 
              md:h-80 
              lg:h-[350px] 
              object-cover 
              hover:scale-105 
              transition-transform 
              duration-300
            "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
