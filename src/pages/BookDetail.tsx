import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext"; // Assume this context manages the dark mode state

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://bookhub-back.onrender.com/api/books/${id}`);
        setBook(response.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        <p>Book not found.</p>
      </div>
    );
  }

  const selectedChapter = book.chapters?.[selectedChapterIndex] || { title: "No Chapters Available", pages: [] };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"} flex flex-col lg:flex-row p-8 gap-8`}>
      <aside className={`w-full lg:w-1/3 ${darkMode ? "bg-gray-800" : "bg-white"} p-6 shadow-md rounded-lg sticky top-10 h-fit`}>
        <img
          src={book.image || "https://via.placeholder.com/150x200"}
          alt={book.title}
          className="w-48 h-64 mx-auto rounded-md object-cover shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4 text-center">{book.title}</h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-center`}>{book.author}</p>
        <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} text-sm text-center`}>
          {book.genre} • {book.year}
        </p>
        <p className="text-sm flex items-center justify-center text-gray-500 mt-2">
          Avg Rating: <span className="text-yellow-500 ml-1">⭐ {book.rating}</span>
        </p>

        <h3 className={`text-lg font-semibold mt-6 ${darkMode ? "text-gray-300" : "text-black"}`}>Chapters</h3>
        <div className="mt-2 flex flex-col gap-2">
          {book.chapters?.length > 0 ? (
            book.chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedChapterIndex(index);
                  setCurrentPageIndex(0);
                }}
                className={`p-2 text-left rounded-md text-sm transition duration-200 ${
                  selectedChapterIndex === index
                    ? "bg-blue-600 text-white font-semibold"
                    : `${darkMode ? "bg-gray-700" : "bg-gray-200"} hover:${darkMode ? "bg-gray-600" : "bg-gray-300"}`
                }`}
              >
                {chapter.title}
              </button>
            ))
          ) : (
            <p className="text-gray-500 italic">No chapters available.</p>
          )}
        </div>
      </aside>

      <main className={`w-full lg:w-2/3 ${darkMode ? "bg-gray-800" : "bg-white"} p-6 shadow-md rounded-lg`}>
        <h3 className={`text-xl font-semibold ${darkMode ? "text-gray-300" : "text-black"}`}>{selectedChapter.title}</h3>

        <div className={`mt-4 p-6 text-lg leading-relaxed ${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-800"} shadow-sm rounded-lg min-h-[200px]`}>
          <p>{selectedChapter.pages?.[currentPageIndex] || "No content available."}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPageIndex((prev) => prev - 1)}
            disabled={currentPageIndex === 0}
            className={`px-6 py-2 flex items-center gap-2 text-white font-semibold rounded-md transition ${
              currentPageIndex === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <FaArrowLeft /> Previous
          </button>

          <span className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm font-semibold`}>
            Page {currentPageIndex + 1} of {selectedChapter.pages?.length || 1}
          </span>

          <button
            onClick={() => setCurrentPageIndex((prev) => prev + 1)}
            disabled={currentPageIndex >= (selectedChapter.pages?.length || 1) - 1}
            className={`px-6 py-2 flex items-center gap-2 text-white font-semibold rounded-md transition ${
              currentPageIndex >= (selectedChapter.pages?.length || 1) - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
