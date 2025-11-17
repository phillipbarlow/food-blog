import { Link } from "react-router-dom";
import cookiesImg from "../images/grid-1.png";
export default function AboutSection() {
  return (
    <section className="bg-[#EBEAE6] py-6 lg:py-10 px-6 mt-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto grid gap-8 justify-items-center items-start lg:grid-cols-2 lg:gap-16 lg:justify-items-start lg:items-center">
        
        {/* Text side */}
        <div className="space-y-3 text-center mx-auto lg:text-left max-w-md lg:mx-0">
          <p className="uppercase text-gray-600 text-xs tracking-[0.15em]">
            About cookbakeshare
          </p>
          <h2 className="text-2xl md:text-3xl font-serif leading-snug text-gray-900">
            Simple recipes you'll actually make.
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed ">
            I'm Phil-home cook/baker and serious tinkerer. I have a passion for
            food and coding, I made this website to share all my favourite
            recipes with friends and family.
          </p>
          <Link
            to="/recipes"
            className="inline-block rounded-full bg-emerald-600 shadow-sm hover:bg-emerald-700 transition-colors text-white px-4 py-2 text-sm"
          >
            Explore Recipes
          </Link>
        </div>
        {/* Image side */}
        <div className="order-first lg:order-0 max-w-[280px] sm:max-w-[320px] mx-auto">
          <img
            src={cookiesImg}
            alt="cookies on a tray cooling"
            className="block rounded-xl shadow-sm w-full aspect-square lg:aspect-4/5 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
