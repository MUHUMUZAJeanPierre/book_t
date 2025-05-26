import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars, FaChevronDown, FaHome, FaMoneyCheckAlt, FaUser, FaBook
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

interface User {
  name?: string;
  role?: "student" | "teacher" | "admin" | "visitor";
  profilePic?: string;
}

const Sidebar: React.FC<{ user?: User }> = ({ user }) => {
  const { darkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expanded, setExpanded] = useState(false); // Keep expanded
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { path: "/dashboard/library", label: "Library", icon: <FaHome /> },
    { path: "/dashboard/record", label: "Record Stats", icon: <FaMoneyCheckAlt /> },
    { path: "/login", label: "Admin", icon: <FaUser /> },
  ];

  const bookCategories = [
    "All Genres",
    "Business",
    "Technology",
    "Romantic",
    "Adventure",
    "Fictional",
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"} border-r border-gray-300 pt-24 shadow-md transition-all duration-300 z-40 flex flex-col justify-between 
        ${isOpen ? (isMobile ? "w-56" : "w-60") : "w-16"}`}
    >
      <div className="flex gap-3 items-center p-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-sm focus:outline-none`}
        >
          <FaBars />
        </button>
        <h2 className={`text-sm font-medium transition-all ${isOpen ? "block" : "hidden"}`}>
          Menu
        </h2>
      </div>

      <nav className="flex flex-col space-y-2 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-md transition relative group 
              ${location.pathname === item.path ? (darkMode ? "text-[#FAF7F2] bg-gray-800" : "text-[#1a160f78] bg-gray-200") : (darkMode ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-black hover:bg-gray-200")}`}
          >
            <div className="text-sm">{item.icon}</div>
            <span className={`ml-3 text-sm transition-all ${isOpen ? "block" : "hidden"}`}>
              {item.label}
            </span>

            {!isOpen && (
              <span className="absolute left-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                {item.label}
              </span>
            )}
          </Link>
        ))}

        <div
          className={`px-4 py-3 flex items-center cursor-pointer rounded-md ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          onClick={() => setExpanded(!expanded)}
        >
          <FaBook className={`${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          <span className={`ml-2 text-sm font-medium ${isOpen ? "block" : "hidden"}`}>
            Book Categories
          </span>


          <FaChevronDown className={`ml-auto transition-transform ${expanded ? "rotate-180" : ""} ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
        </div>

        {expanded && (
          <div className="space-y-1 border-l-4 ml-4 pl-2 " style={{ maxHeight: "200px", overflowY: "auto" }}>
            {bookCategories.map((category, index) => (
              <div
                key={index}
                className={`flex items-center px-3 py-1 cursor-pointer text-sm rounded-md transition-all 
                  ${location.pathname.includes(category.toLowerCase()) ? "bg-blue-500 text-white" : "text-gray-800 hover:bg-gray-300"}`}
                onClick={() => navigate(`/dashboard/${category.toLowerCase()}`)}
              >
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <span className="ml-2">{category}</span>
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
