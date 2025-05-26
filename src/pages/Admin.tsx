import { useEffect, useState, useMemo, useCallback } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import BookForm from "../components/BookForm";
import BookDetailModal from "../components/BookDetailModal";
import { useDarkMode } from "../context/DarkModeContext"; // Import DarkModeContext

interface Book {
    _id: string;
    title: string;
    author: string;
    rating: number;
    status: string;
    genre: string;
    year: number;
    image: string;
    categories: string;
}

const itemsPerPage = 5;

const Admin: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [inventory, setInventory] = useState<Book[]>([]);
    const [editingItem, setEditingItem] = useState<Book | null>(null);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

    const { darkMode } = useDarkMode(); // Get dark mode status from context

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get<{ data: Book[] }>("https://bookhub-back.onrender.com/api/books");
                setBooks(response.data.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const totalPages = useMemo(() => Math.ceil(books.length / itemsPerPage), [books.length]);
    const paginatedBooks = useMemo(
        () => books.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [books, currentPage]
    );

    const handleDelete = useCallback(async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await axios.delete(`https://bookhub-back.onrender.com/api/books/${id}`);
            setBooks((prev) => prev.filter((book) => book._id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    }, []);

    const openCreateForm = useCallback(() => {
        setEditingItem(null);
        setIsFormOpen(true);
    }, []);

    const openEditForm = useCallback((item: Book) => {
        setEditingItem(item);
        setIsFormOpen(true);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    const openDetailModal = (book: Book) => {
        setSelectedBook(book);
        setIsDetailOpen(true);
    };

    return (
        <div className={`container mx-auto px-4 py-12 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} relative`}>
            <div className={`shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                {/* Header */}
                <div className={`px-4 py-3 border-b ${darkMode ? "border-gray-600" : "border-gray-200"} flex justify-between items-center`}>
                    <h3 className="text-lg font-semibold">Books Overview</h3>
                    <button
                        onClick={openCreateForm}
                        className={`bg-[#101828] text-white px-4 py-2 text-sm font-medium rounded-md flex items-center hover:bg-[#101828] transition ${darkMode ? "hover:bg-gray-600" : ""}`}
                    >
                        <FaPlus className="mr-2 text-sm" /> Add Book
                    </button>
                </div>

                <div className={`overflow-x-auto ${darkMode ? "bg-gray-700" : ""}`}>
                    <table className={`w-full text-left text-sm border-collapse ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        <thead className={`${darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                            <tr className="text-sm">
                                <th className="px-4 py-2 whitespace-nowrap">Image</th>
                                <th className="px-4 py-2 whitespace-nowrap">Title</th>
                                <th className="px-4 py-2 whitespace-nowrap">Author</th>
                                <th className="px-4 py-2 whitespace-nowrap">Rating</th>
                                <th className="px-4 py-2 whitespace-nowrap">Status</th>
                                <th className="px-4 py-2 whitespace-nowrap">Genre</th>
                                <th className="px-4 py-2 whitespace-nowrap">Category</th>
                                <th className="px-4 py-2 whitespace-nowrap">Year</th>
                                <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBooks.map((book) => (
                                <tr key={book._id} className={`border-b ${darkMode ? "border-gray-600 hover:bg-gray-600" : "border-gray-200 hover:bg-gray-100"}   `}>
                                    <td className="px-4 py-2">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-10 h-10 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{book.title}</td>
                                    <td className="px-4 py-2">{book.author}</td>
                                    <td className="px-4 py-2 text-center">{book.rating} ⭐</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-white text-xs font-semibold rounded-full ${
                                                book.status === "Read" ? "bg-green-500" : "bg-yellow-500"
                                            }`}
                                        >
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{book.genre}</td>
                                    <td className="px-4 py-2">{book.categories || "Uncategorized"}</td>
                                    <td className="px-4 py-2">{book.year}</td>
                                    <td className="px-4 py-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                        <button onClick={() => openDetailModal(book)} className="text-blue-500 hover:text-blue-700 p-1">
                                            <FaEye className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => openEditForm(book)}
                                            className="text-yellow-500 hover:text-yellow-700 p-1"
                                        >
                                            <FaEdit className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <FaTrash className="text-sm" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={`mt-4 mb-4 flex justify-center space-x-2 ${darkMode ? "text-gray-300" : ""}`}>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"} disabled:opacity-50`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === index + 1
                                    ? "bg-[#101828] text-white"
                                    : darkMode
                                    ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"} disabled:opacity-50`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <BookDetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} book={selectedBook} />
            <BookForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} item={editingItem} setInventory={setInventory} />
        </div>
    );
};

export default Admin;
