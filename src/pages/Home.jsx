import heroImage from "../images/hero.webp";
import FeaturedRecipes from "../components/FeaturedRecipes";

export default function Home() {
  return (
    <main>
      {/* Hero section */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt="Fresh green salad tossed in a bowl"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center
                  text-center text-white px-6 translate-y-[-8%]"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
            Cook. Bake. Share.
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-[700px] drop-shadow-md">
            Fresh recipes, simple steps, homemade happiness.
          </p>
        </div>
      </section>
      <FeaturedRecipes/>
      </main>
  );
}
