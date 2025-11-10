import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
import logo from "../images/logo.png";
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    // Global container
    <div>
      <header className=" flex items-center justify-between bg-white h-[100px]">
        <nav className="relative flex justify-between items-center w-full h-full px-5">
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
              transform transition-all duration-300 ease-out lg:order-1 lg:static lg:w-auto  lg:transform-none
              lg:opacity-100 lg:visible lg:pointer-events-auto  lg:items-center lg:h-full
              ${
                open
                  ? "translate-y-0 opacity-100 visible"
                  : "hidden lg:flex lg:opacity-100 lg:visible lg:transform-none"
              }
              `}
          >
            <ul className=" font-['Inter'] text-[16px] lg:text-[17px] font-medium tracking-[0.01em] antialiased flex flex-col w-full items-center p-8 space-y-5 m-0 list-none bg-white lg:flex-row lg:space-y-0 lg:space-x-6 lg:bg-transparent lg:h-full lg:p-0 lg:items-center">
              <li className={`flex space-x-5 ${login ? "hidden" : "visible"}`}>
                <section>
                  <Link className="navItem" to="#">
                    Log in
                  </Link>
                </section>
                <section>
                  <Link className="navItem " to="#">
                    Create an account
                  </Link>
                </section>
              </li>
              <li>
                <Link className="navItem font-['Inter']" to="#">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#">
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#">
                  Bakes
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>
          <img
            src={logo}
            alt="cook bake and share logo lg:order-1"
            className="h-45"
          />
          <div className="m-3 lg:order-3">
            <p className="cursor-pointer">
              {login ? "Hey Phil" : "Login/signup"}
            </p>
          </div>
        </nav>
      </header>
    </div>
  );
}
