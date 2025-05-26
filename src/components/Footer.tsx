import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaBehance } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F3F2EC] text-gray-800 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-wide">BOOK<span className="text-yellow-800">HUB</span></h2>
            <p className="mt-4 text-gray-600">
            Move towards ease and comfort, free yourself as you aim for success. Excellence in learning leads to growth and achievement.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">About Us</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><a href="/">Vision</a></li>
              <li><alert href="/">Articles</alert></li>
              <li><a href="/">Careers</a></li>
              <li><a href="/">Service Terms</a></li>
              <li><a href="/">Donate</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Discover</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><a href="/">Home</a></li>
              <li><a href="/">Books</a></li>
              <li><a href="/">Authors</a></li>
              <li><a href="/">Subjects</a></li>
              <li><a href="/">Advanced Search</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">My Account</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><a href="/login">Sign In</a></li>
              <li><a href="/">View Cart</a></li>
              <li><a href="/">My Wishlist</a></li>
              <li><a href="/">Track My Order</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Help</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li><a href="/">Help Center</a></li>
              <li><a href="/">Report a Problem</a></li>
              <li><a href="/">Suggesting Edits</a></li>
              <li><a href="/">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 All rights reserved.  <span className="text-gray-500">MUHUMUZA Jean Pierre</span>
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/jean-pierre-muhumuza-81928628a/" className="text-gray-600 hover:text-gray-800">
              <FaFacebookF size={18} />
            </a>
            <a href="https://www.linkedin.com/in/jean-pierre-muhumuza-81928628a/" className="text-gray-600 hover:text-gray-800">
              <FaTwitter size={18} />
            </a>
            <a href="https://www.linkedin.com/in/jean-pierre-muhumuza-81928628a/" className="text-gray-600 hover:text-gray-800">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
