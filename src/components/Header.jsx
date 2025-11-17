import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
import logo from "../images/cbs.jpeg";
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    // Global container
    <div>
      <header className=" relative flex items-center justify-between bg-[#EBEAE6] h-[100px] ">
        <nav className="relative flex justify-between items-center w-full h-full">
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
            className={`absolute top-full z-30 w-full h-screen
              transform transition-all duration-300 ease-out lg:order-1 lg:static lg:w-auto  lg:transform-none
              lg:opacity-100 lg:visible lg:pointer-events-auto  lg:items-center lg:h-full
              ${
                open
                  ? "translate-y-0 opacity-100 visible"
                  : "hidden lg:flex lg:opacity-100 lg:visible lg:transform-none"
              }
              `}
          >
            <ul
              className={`font-['Inter'] text-[16px] lg:text-[17px] font-medium tracking-[0.01em] antialiased
              flex flex-col w-full items-center p-8 space-y-5  list-none bg-[#EBEAE6]
              lg:flex-row lg:space-y-0 lg:space-x-6 lg:bg-transparent lg:h-full lg:p-0 lg:items-center
              ${open ? "block" : "hidden"} lg:flex`}
            >
              <li
                className={`flex space-x-5 lg:hidden mt-12 ${
                  loggedIn ? "hidden" : "visible"
                }`}
              >
                <section>
                  <Link
                    className="navItem"
                    to="#"
                    onClick={() => setOpen(false)}
                  >
                    Log in
                  </Link>
                </section>
              </li>
              <li>
                <Link
                  className="navItem font-['Inter']"
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#" onClick={() => setOpen(false)}>
                  Recipes
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#" onClick={() => setOpen(false)}>
                  Bakes
                </Link>
              </li>
              <li>
                <Link className="navItem" to="#" onClick={() => setOpen(false)}>
                  Gallery
                </Link>
              </li>
              <li>
                <a className="navItem" href="mailto:phillipbarlow10@gmail.com">
                  Get in touch
                </a>
              </li>
            </ul>
          </div>
          <Link
            to={"/"}
            className="absolute left-1/2 -translate-x-1/2 mt-8 z-50
             lg:static lg:left-auto lg:translate-x-0"
          >
            <img
              src={logo}
              alt="cook bake and share logo lg:order-1"
              className="h-55 w-55 p-5 rounded-full "
            />
          </Link>
          <div className="m-3 lg:order-3  ">
            <Link
              className="cursor-pointer bg-[#CC6330] px-6 py-3 text-white rounded-md shadow-2xl hover:bg-[#CC6330]/80 transition"
              to={loggedIn ? "#" : "/login"}
            >
              {loggedIn ? "Hey Phil" : "Login"}
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
