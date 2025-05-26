import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="relative z-10 flex flex-col items-center justify-center">
        <nav className="flex justify-between items-center px-10 py-5 w-[95%] bg-[rgba(0,0,0,0.09)] mx-auto fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
          <div>
            <h1 className="text-xl font-medium">BOOK<span className="text-yellow-700">HUB</span></h1>
          </div>

          <ul className="hidden md:flex space-x-6 text-gray-600 font-sm">
            <li className="nav-item cursor-pointer">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li className="nav-item cursor-pointer">
              <ScrollLink to="features" smooth={true} duration={500}>
                Features
              </ScrollLink>
            </li>
            <li className="nav-item cursor-pointer">
              <ScrollLink to="popular" smooth={true} duration={500}>
                Popular
              </ScrollLink>
            </li>
            <li className="nav-item cursor-pointer">
              <ScrollLink to="library" smooth={true} duration={500}>
                Library
              </ScrollLink>
            </li>
            <li className="nav-item cursor-pointer">
              <ScrollLink to="contact" smooth={true} duration={500}>
                Contact
              </ScrollLink>
            </li>
          </ul>

          <RouterLink to="/login">
            <button className="text-gray-600 border px-5 py-2 rounded-lg">
              JOIN NOW
            </button>
          </RouterLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
