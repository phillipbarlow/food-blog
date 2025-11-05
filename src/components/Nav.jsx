import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
export default function Nav() {
  const [openClose, setOpenClose] = useState(false);
  function toggleBtn() {
    return setOpenClose((btn) => !btn);
  }
  return (
    <div className="relative">
      {/* Navigation button */}
      <button
        id="menu-btn"
        onClick={toggleBtn}
        className={`relative lg:hidden focus:outline-none m-5 hamburger ${
          openClose === false ? "hamburger " : "open"
        }`}
        type="button"
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </button>
      {/* Dropdown navigation */}
      <div
        className={`h-screen fixed top-[100px]  w-full ${
          openClose ? "block" : "hidden"
        }`}
      >
        <ul className="bg-gray-200 w-full flex flex-col items-center p-10 h-screen space-y-5 ">
          <li className="flex space-x-5">
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
    </div>
  );
}
