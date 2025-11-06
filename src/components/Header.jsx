import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
import profileIcon from "../images/profile-icon.png";
import heroImage from "../images/hero.webp";
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    // Global container
    <div>
      <header className=" flex items-center justify-between bg-gray-300 h-[100px]">
        <nav className="relative flex justify-between items-center w-full h-full px-5 ">
          {/* hamburger button */}
          <button
            id="menu-btn"
            onClick={() => setOpen((prev) => !prev)}
            className={`relative lg:hidden focus:outline-none mx-5 hamburger ${
              open === false ? "hamburger " : "open"
            }`}
            type="button"
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
          {/* Dropdown navigation */}
          <div
            className={`fixed left-0 top-[100px] z-30 w-full h-screen
              transform transition-all duration-300 ease-out lg:static lg:w-auto  lg:transform-none
              lg:opacity-100 lg:visible lg:pointer-events-auto  lg:items-center lg:h-full
              ${
                open
                  ? "translate-y-0 opacity-100 visible"
                  : "hidden lg:flex lg:opacity-100 lg:visible lg:transform-none"
              }
              `}
          >
            <ul className="bg-gray-200 flex flex-col w-full items-center p-8 space-y-5 m-0 list-none lg:flex-row lg:space-y-0 lg:space-x-6  lg:bg-transparent lg:h-full lg:p-0 lg:items-center">
              <li className="flex space-x-5 lg:hidden">
                <section>
                  <Link to="#">Log in</Link>
                </section>
                <section>
                  <Link to="#">Create an account</Link>
                </section>
              </li>
              <li>
                <Link to="#">Home</Link>
              </li>
              <li>
                <Link to="#">Recipes</Link>
              </li>
              <li>
                <Link to="#">Bakes</Link>
              </li>
              <li>
                <Link to="#">Gallery</Link>
              </li>
              <li>
                <Link to="#">Get in touch</Link>
              </li>
            </ul>
          </div>
          <h1 className="text-2xl lg:order-1 m-0">CookBakeShare</h1>
          <div className="m-3 lg:order-3">
            <img src={profileIcon} alt="user profile icon" className="w-12" />
          </div>
        </nav>
      </header>
      <section className="relative min-h-[60svh] md:min-h-[70vh] lg:min-h-[80vh]">
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
    </div>
  );
}
