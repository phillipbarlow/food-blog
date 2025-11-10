import grid1 from "../images/grid-1.png";
import grid2 from "../images/grid-2.png";
import grid3 from "../images/grid-3.png";
import grid4 from "../images/grid-4.png";
import grid5 from "../images/grid-5.png";
import grid6 from "../images/grid-6.png";

export default function FeaturedRecipes() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-4xl mt-7 mb-7">Featured recipes</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 p-8 mx-auto ">
          {[
            { id: 1, src: grid1, alt: "Cookies on a tray" },
            { id: 2, src: grid2, alt: "Fresh salad" },
            { id: 3, src: grid3, alt: "Hummus" },
            {
              id: 4,
              src: grid4,
              alt: "Chicken salad sandwich on a brown chopping board",
            },
            { id: 5, src: grid5, alt: "Mozzeralla with tomatoes" },
            {
              id: 6,
              src: grid6,
              alt: "Raspberry cheese cake with browny base",
            },
          ].map((img) => (
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
