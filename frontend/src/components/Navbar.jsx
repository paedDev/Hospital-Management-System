import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);
  return (
    <nav className="p-4  fixed top-0 left-0 z-50 shadow-xl w-full backdrop-blur-2xl  ">
      <div className="flex items-center justify-between max-w-6xl mx-auto  px-4 py-3 lg:py-4 ">
        {/* Logo */}
        <Link to={"/"} className="font-bold tracking-wider">
          HMS Management
        </Link>
        {/* Nav tags */}
        <div className="hidden lg:flex items-center space-x-6 text-sm">
          <button className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500 ">
              Home
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300  group-hover:w-full"></span>
          </button>
          <button className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500 ">
              Customers
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300  group-hover:w-full"></span>
          </button>

          <button className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500 ">
              About Us
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300  group-hover:w-full"></span>
          </button>
          <button className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500 ">
              HMS Solutions
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300  group-hover:w-full"></span>
          </button>
          <button className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500 ">
              Contact Us
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300  group-hover:w-full"></span>
          </button>
        </div>
        {/* Sign up / login & hamburger menu*/}
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-orange-400 px-4 py-2 rounded-lg text-white hover:bg-orange-500 transition-colors">
            Book a Demo
          </button>
          <Link to="/login" className="text-sm hover:text-orange-500">
            Register
          </Link>
        </div>
        <button
          className="md:hidden p-1"
          onClick={() => setMenu((prev) => !prev)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`md:hidden border-t backdrop-blur-2xl overflow-hidden transition-all duration-500
          ${menu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 space-y-3 flex flex-col items-center justify-center">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            Customers
          </Link>
          <Link
            to="/"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            to="/"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            HMS Solutions
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link to={"/register"}>
            <button className="px-4 py-2 border rounded-lg bg-orange-400 text-white">
              Login / Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
