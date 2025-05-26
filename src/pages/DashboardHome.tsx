import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../context/DarkModeContext";
import TopNavigation from "../components/TopNavigation"; // Import TopNavigation

const DashboardHome = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://bookhub-back.onrender.com/api/books");
        setBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-7 ${darkMode ? "bg-[#101828]" : "bg-gradient-to-r"}`}>
      <TopNavigation onSearch={setSearchQuery} /> {/* Pass search function */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-20">
        {filteredBooks.length === 0 ? (
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No books available</p>
        ) : (
          filteredBooks.map((book) => (
            <Link key={book._id} to={`/dashboard/library/${book._id}`} className="block">
              <div className={`flex p-5 rounded-xl items-center gap-4 transform shadow-sm hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <img src={book.image || "https://randomuser.me/api/portraits/men/1.jpg"} alt={book.title} className="w-24 h-32 rounded-lg object-cover" />
                <div>
                  <h3 className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-700"}`}>{book.title}</h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{book.author}</p>
                  <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-sm`}>{book.genre} • {book.year}</p>
                  <p className={`text-sm flex items-center ${darkMode ? "text-gray-400" : "text-gray-400"}`}>Avg Rating: <span className="text-yellow-500 ml-1">⭐ {book.rating}</span></p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
