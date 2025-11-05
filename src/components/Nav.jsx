import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useState } from "react";
import profileIcon from "../images/profile-icon.png";
export default function Nav() {
  const [open, setOpen] = useState(false);
 
  return (
    <nav className="relative flex justify-between items-center w-full px-5">
      {/* hamburger button */}
      <button
        id="menu-btn"
        onClick={()=>setOpen((prev)=>!prev)}

        className={`relative lg:hidden focus:outline-none m-5 hamburger ${
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
        className={`z-30 left-0 h-screen fixed top-[100px]  w-full transform transition-all duration-600 ease-out lg:flex  ${open ? "translate-y-0 opacity-100 visible" : "-translate-y-3 opacity-0 invisible pointer-events-none"}`}
      >
        <ul className="bg-gray-200 w-full flex flex-col items-center p-10 h-screen space-y-5 lg:space-y-0 lg:space-x-9 lg:flex-row lg:bg-transparent lg:h-auto">
          <li className="flex space-x-5 lg:space-y-0 lg-p-0 lg:hidden">
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
      <h1 className="text-2xl lg:order-1">CookBakeShare</h1>
      <div className="m-3 lg:order-3">
        <img src={profileIcon} alt="user profile icon" className="w-12" />
      </div>
    </nav>
  );
}
