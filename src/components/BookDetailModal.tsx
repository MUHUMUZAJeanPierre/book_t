import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BookDetailModal = ({ isOpen, onClose, book }) => {
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    if (!isOpen || !book) return null; // Hide modal if not open

    const selectedChapter = book.chapters?.[selectedChapterIndex] || { title: "No Chapters", pages: [] };

    return (
        <div className="absolute top-10  inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg transition-transform transform scale-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{book.title}</h2>
                    <button onClick={onClose} className="text-red-500 font-bold text-xl">&times;</button>
                </div>

                {/* Book Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded-lg shadow-md" />

                    <div className="space-y-2">
                        <p className="text-gray-700"><strong>Author:</strong> {book.author}</p>
                        <p className="text-gray-700"><strong>Genre:</strong> {book.genre}</p>
                        <p className="text-gray-700"><strong>Category:</strong> {book.categories}</p>
                        <p className="text-gray-700"><strong>Year:</strong> {book.year}</p>
                        <p className="text-gray-700"><strong>Status:</strong> {book.status}</p>
                        <p className="text-gray-700"><strong>Rating:</strong> ⭐ {book.rating}</p>
                    </div>
                </div>

                {/* Chapters List */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Chapters</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {book.chapters.length > 0 ? (
                            book.chapters.map((chapter, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedChapterIndex(index);
                                        setCurrentPageIndex(0);
                                    }}
                                    className={`p-2 rounded-md text-sm transition duration-200 ${
                                        selectedChapterIndex === index
                                            ? "bg-blue-600 text-white font-semibold"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {chapter.title}
                                </button>
                            ))
                        ) : (
                            <p className="text-gray-500">No chapters available.</p>
                        )}
                    </div>
                </div>

                {/* Chapter Pages */}
                {selectedChapter.pages.length > 0 && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                        <h4 className="text-md font-semibold">{selectedChapter.title}</h4>
                        <p className="text-gray-800 mt-2">{selectedChapter.pages[currentPageIndex]}</p>

                        {/* Pagination */}
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

                            <span className="text-sm font-semibold text-gray-600">
                                Page {currentPageIndex + 1} of {selectedChapter.pages.length}
                            </span>

                            <button
                                onClick={() => setCurrentPageIndex((prev) => prev + 1)}
                                disabled={currentPageIndex === selectedChapter.pages.length - 1}
                                className={`px-6 py-2 flex items-center gap-2 text-white font-semibold rounded-md transition ${
                                    currentPageIndex === selectedChapter.pages.length - 1
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                Next <FaArrowRight />
                            </button>
                        </div>
                    </div>
                )}

                {/* Close Button */}
                <div className="mt-6 flex justify-center">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetailModal;
