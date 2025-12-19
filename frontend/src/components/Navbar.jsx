import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".nav",
          start: "top top",
          end: "50px",
          scrub: 0.5,
        },
      });

      tl.to(navRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
      }).to(
        logoRef.current,
        {
          scale: 0.9,
          duration: 0.3,
        },
        0
      );
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="nav fixed top-0 left-0 z-50 w-full transition-colors duration-300 bg-transparent py-1"
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-3 lg:py-4">
        {/* Logo */}
        <Link ref={logoRef} to="/" className="font-bold tracking-wider">
          HMS Management
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-6 text-sm">
          <a href="#home" className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500">
              Home
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#features" className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500">
              Features
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#about" className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500">
              About Us
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#solutions" className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500">
              HMS Solutions
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#contact" className="relative group px-1">
            <span className="z-10 group-hover:text-orange-500 transition-colors duration-500">
              Contact Us
            </span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-orange-400 px-4 py-2 rounded-lg text-white hover:bg-orange-500 transition-colors">
            Book a Demo
          </button>
          <Link to="/login" className="text-sm hover:text-orange-500">
            Register
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1"
          onClick={() => setMenu((prev) => !prev)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t backdrop-blur-2xl overflow-hidden transition-all duration-500 ${
          menu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 space-y-3 flex flex-col items-center justify-center">
          <a
            href="#home"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#solutions"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            HMS Solutions
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-left hover:text-orange-500 transition-colors duration-200"
          >
            Contact Us
          </a>
          <Link to="/register" onClick={closeMenu}>
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
