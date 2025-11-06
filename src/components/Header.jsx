import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
import profileIcon from "../images/profile-icon.png";
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-gray-300 h-[100px]">
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
                  : 'hidden lg:flex lg:opacity-100 lg:visible lg:transform-none'
              }
              `}
        >
          <ul className="bg-gray-200 flex flex-col w-full items-center p-8 space-y-5 m-0 list-none lg:flex-row lg:space-y-0 lg:space-x-6  lg:bg-transparent lg:h-full lg:p-0 lg:items-center">
            <li className="flex space-x-5 lg:hidden">
              <section>
                <Link className="leading-none" to="#">
                  Log in
                </Link>
              </section>
              <section>
                <Link className="leading-none" to="#">
                  Create an account
                </Link>
              </section>
            </li>
            <li>
              <Link className="block leading-none h-full lg:flex lg:items-center" to="#">Home</Link>
            </li>
            <li>
              <Link className="leading-none" to="#">
                Recipes
              </Link>
            </li>
            <li>
              <Link className="leading-none" to="#">
                Bakes
              </Link>
            </li>
            <li>
              <Link className="leading-none" to="#">
                Gallery
              </Link>
            </li>
            <li>
              <Link className="leading-none" to="#">
                Get in touch
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="text-2xl lg:order-1 m-0">CookBakeShare</h1>
        <div className="m-3 lg:order-3">
          <img src={profileIcon} alt="user profile icon" className="w-12" />
        </div>
      </nav>
    </header>
  );
}
