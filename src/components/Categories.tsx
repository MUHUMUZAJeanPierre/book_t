import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../context/DarkModeContext"; // Dark mode support

interface Book {
    _id: string;
    title: string;
    author: string;
    category: string;
    image?: string;
}

// Function to capitalize only the first letter of a string
const capitalizeFirstLetter = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
};

const Category: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { darkMode } = useDarkMode(); // Dark mode state

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                const formattedCategory = category ? capitalizeFirstLetter(category) : "All genres"; // Capitalize first letter
                const response = await axios.get(
                    formattedCategory === "All genres"
                        ? "https://bookhub-back.onrender.com/api/books"
                        : `https://bookhub-back.onrender.com/api/books?category=${formattedCategory}`
                );
                setBooks(response.data.data || []);
                console.log("Fetched Books:", response.data);
            } catch (error) {
                setError("Error loading books. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [category]);

    return (
        <div className={`min-h-screen p-7 flex justify-center items-center ${darkMode ? "bg-[#101828]" : "bg-gradient-to-r"}`}>
            <div className="w-full max-w-6xl">
                <h1 className={`text-2xl font-bold text-center mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {category ? capitalizeFirstLetter(category.replace("-", " ")) : "Unknown Category"} Books
                </h1>

                {loading && (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                )}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {!loading && !error && books.length === 0 && (
                    <p className={`text-center text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No books available in this category.</p>
                )}

                {!loading && !error && books.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <Link  key={book._id} to={`/dashboard/library/${book._id}`}>
                                <div key={book._id} className={`flex p-5 rounded-xl items-center gap-4 transform shadow-sm shadow-gray-300 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                                    <img
                                        src={book.image || "https://randomuser.me/api/portraits/men/1.jpg"}
                                        alt={book.title}
                                        className="w-24 h-32 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h3 className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-700"}`}>{book.title}</h3>
                                        <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{book.author}</p>
                                        <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-sm`}>Category: {book.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
