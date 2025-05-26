

// import React, { useState, useEffect } from "react";
// import { FaSearch, FaBell, FaMoon, FaBars, FaSun } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDarkMode } from "../context/DarkModeContext"; // Import dark mode context

// const TopNavigation: React.FC = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const { darkMode, toggleDarkMode } = useDarkMode(); // Access dark mode state and toggle function
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const userString = localStorage.getItem("user");


//   const handleLogOut = ()=>{
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   }

//   // useEffect(() => {
//   //   if (token) {
//   //     navigate('/dashboard'); 
//   //   } else {
//   //     navigate('/');
//   //   }
//   // }, [token, navigate]);
  

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (!(event.target as HTMLElement).closest(".user-dropdown")) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <header
//       className={`w-full fixed top-0 left-0 bg-[rgba(0,0,0,0.02)] backdrop-blur-sm shadow-sm px-4 py-5 flex justify-between items-center z-50 transition-all ${darkMode ? "bg-gray-900" : "bg-white"}`}
//     >
//       <span
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4 cursor-pointer"
//       >
//         <h1 className={`text-lg md:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
//           BOOK
//           <br className="block md:hidden" />
//           <span className="text-yellow-600">HUB</span>
//         </h1>
//       </span>

//       <div className="flex items-center space-x-4">
//         <div className={`relative w-3/4 sm:w-64 transition-all ${isMenuOpen ? "block" : "hidden md:block"}`}>
//           <input
//             type="text"
//             placeholder="Search Book"
//             className={`border px-3 py-2 w-full rounded-sm ${darkMode ? "border-gray-400 text-gray-400" : "border-gray-600 text-gray-600"} focus:outline-none focus:ring focus:ring-gray-400`}
//           />
//           <button className={`absolute inset-y-0 right-3 flex items-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//             <FaSearch />
//           </button>
//         </div>

//         <div className={`flex space-x-4 ${isMenuOpen ? "block" : "hidden md:flex"}`}>
//           <button onClick={toggleDarkMode} className="text-xl focus:outline-none">
//             {darkMode ? <FaSun className="" /> : <FaMoon  className="text-gray-500"/>}
//           </button>
//           <button className={`text-xl ${darkMode ? "text-white" : "text-gray-600"} focus:outline-none`}>
//             <FaBell />
//           </button>
//         </div>

//         <div className="relative user-dropdown">
//           <button onClick={() => setIsDropdownOpen((prev) => !prev)} className="focus:outline-none">
//             <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-10 h-10 rounded-full" />
//           </button>
//           {isDropdownOpen && (
//             <div className={`absolute right-0 mt-2 w-40 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg p-2`}>
//               <a
//                 href="/profile"
//                 className={`block px-4 py-2 ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"} rounded`}
//               >
//                 Profile
//               </a>
//               <button
//                 className={`block w-full text-left px-4 py-2 ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"} rounded`}
//                 onClick={handleLogOut}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopNavigation;



import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaMoon, FaBars, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext"; 

const TopNavigation = ({ onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!(event.target as HTMLElement).closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the function passed from DashboardHome
  };

  return (
    <header className={`w-full fixed top-0 left-0 bg-opacity-90 backdrop-blur-sm shadow-sm px-4 py-5 flex justify-between items-center z-50 transition-all ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <span onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
        <h1 className={`text-lg md:text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
          BOOK<span className="text-yellow-600">HUB</span>
        </h1>
      </span>

      <div className="flex items-center space-x-4">
        <div className="relative w-3/4 sm:w-64">
          <input
            type="text"
            placeholder="Search Book"
            value={searchQuery}
            onChange={handleSearchChange} // Updated to trigger search
            className={`border px-3 py-2 w-full rounded-sm ${darkMode ? "border-gray-400 text-gray-400" : "border-gray-600 text-gray-600"} focus:outline-none focus:ring focus:ring-gray-400`}
          />
          <button className="absolute inset-y-0 right-3 flex items-center">
            <FaSearch className={darkMode ? "text-gray-400" : "text-gray-600"} />
          </button>
        </div>

        <div className="flex space-x-4">
          <button onClick={toggleDarkMode} className="text-xl focus:outline-none">
            {darkMode ? <FaSun /> : <FaMoon className="text-gray-500" />}
          </button>
          <button className={`text-xl ${darkMode ? "text-white" : "text-gray-600"} focus:outline-none`}>
            <FaBell />
          </button>
        </div>

        <div className="relative user-dropdown">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" className="w-10 h-10 rounded-full" />
          </button>
          {isDropdownOpen && (
            <div className={`absolute right-0 mt-2 w-40 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg p-2`}>
              <a href="/profile" className={`block px-4 py-2 ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"} rounded`}>
                Profile
              </a>
              <button className={`block w-full text-left px-4 py-2 ${darkMode ? "text-white hover:bg-gray-700" : "text-gray-800 hover:bg-gray-100"} rounded`} onClick={handleLogOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
