import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const categories = ["All Genres", "Business", "Technology", "Romantic", "Adventure", "Fictional"];
const BookForm = ({ isOpen, onClose, item, setInventory }) => {
    const navigate = useNavigate();
    const [posterPath, setPosterPath] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        rating: 0,
        status: "Unread",
        genre: "",
        year: new Date().getFullYear(),
        image: "",
        categories:"All Genres",
        posterPath: posterPath,
        chapters: [],
    });

        // ✅ Populate form for editing
    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title || "",
                author: item.author || "",
                rating: item.rating || 0,
                status: item.status || "Unread",
                genre: item.genre || "",
                year: item.year || new Date().getFullYear(),
                image: item.image || "",
                categories: item.categories || "All Genres",
                posterPath: posterPath,
                chapters: item.chapters || [],
            });
        } else {
            setFormData({
                title: "",
                author: "",
                rating: 0,
                status: "Unread",
                genre: "",
                year: new Date().getFullYear(),
                image: "",
                categories: "All Genres",
                posterPath: posterPath,
                chapters: [],
            });
        }
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("Item Status:", item?.status);
        console.log("FormData before sending:", formData);

    };

  

    const removeChapter = (index) => {
        setFormData(prev => ({
            ...prev,
            chapters: prev.chapters.filter((_, i) => i !== index),
        }));
    };
    

    const handleChapterChange = (index, e) => {
        setFormData(prev => {
            const updatedChapters = [...prev.chapters];
            updatedChapters[index] = { ...updatedChapters[index], title: e.target.value };
            return { ...prev, chapters: updatedChapters };
        });
    };

    const handlePageChange = (chapterIndex, pageIndex, e) => {
        setFormData(prev => {
            const updatedChapters = [...prev.chapters];
            const updatedPages = [...updatedChapters[chapterIndex].pages];
            updatedPages[pageIndex] = e.target.value;
            updatedChapters[chapterIndex] = { ...updatedChapters[chapterIndex], pages: updatedPages };
    
            return { ...prev, chapters: updatedChapters };
        });
    };
    
 
    //  Add new chapter
    const addChapter = () => {
        setFormData(prev => ({
            ...prev,
            chapters: [...prev.chapters, { title: "", pages: [""] }],
        }));
    };
    
    

    const addPage = (chapterIndex) => {
        const updatedChapters = [...formData.chapters];
        updatedChapters[chapterIndex].pages.push("");
        setFormData({ ...formData, chapters: updatedChapters });
    };

    const removePage = (chapterIndex, pageIndex) => {
        const updatedChapters = [...formData.chapters];
        updatedChapters[chapterIndex].pages.splice(pageIndex, 1);
        setFormData({ ...formData, chapters: updatedChapters });
    };


    //  Add new book
    const handleAdd = async (e) => {
        e.preventDefault();
        const data = new FormData();
    
        Object.keys(formData).forEach(key => {
            if (key === "image") {
                data.append("image", formData.image);
            } else if (key === "chapters") {
                data.append("chapters", JSON.stringify(formData.chapters));  // ✅ Convert to JSON before sending
            } else {
                data.append(key, formData[key]);
            }
        });
    
        try {
            const response = await axios.post("https://bookhub-back.onrender.com/api/books", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            setInventory((prev) => [...prev, response.data.data]);
            toast.success("Book added successfully!");
            setTimeout(() => navigate("/dashboard/admin"), 1000);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add book!");
        }
    };
    

    // Update existing book
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!item?._id) {
            console.error("No book ID provided for update.");
            return;
        }
        try {
            const response = await axios.put(`https://bookhub-back.onrender.com/api/books/${item._id}`, formData);

            setInventory((prev) =>
                prev.map((book) => (book._id === item._id ? response.data.data : book))
            );

            toast.success("Book updated successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to update book!");
        }
    };





    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };


    if (!isOpen) return null;

    return (
        <div className="absolute top-10 inset-0 flex items-center justify-center z-50">
            <div className="p-6 rounded-lg shadow-lg w-96 bg-white text-gray-900 transition-all duration-300">
                <h2 className="text-lg font-semibold mb-4">{item ? "Edit Book" : "Add New Book"}</h2>
                <form className="grid gap-4" onSubmit={handleAdd}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="border px-3 py-2 rounded-lg" required />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Rating</label>
                            <input type="number" name="rating" value={formData.rating} onChange={handleChange} className="border px-3 py-2 rounded-lg" min="0" max="5" step="0.1" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="border px-3 py-2 rounded-lg">
                                <option value="Read">Read</option>
                                <option value="Unread">Unread</option>
                            </select>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Genre</label>
                            <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="border px-3 py-2 rounded-lg" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Category</label>
                            <select name="categories" value={formData.categories} onChange={handleChange} className="border px-3 py-2 rounded-lg">
                                <option value="All Genres">All Genres</option>
                                <option value="Business">Business</option>
                                <option value="Technology">Technology</option>
                                <option value="Romantic">Romantic</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Fictional">Fictional</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Year</label>
                            <input type="number" name="year" value={formData.year} onChange={handleChange} className="border px-3 py-2 rounded-lg" min="1900" max={new Date().getFullYear()} />
                        </div>
                    </div>

                     {/* third Row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author} 
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />

                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium">Image URL</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImage}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />

                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-medium">Chapters</label>
                        {formData.chapters.map((chapter, index) => (
                            <div key={index} className="mb-4 p-2 border rounded">
                                <input
                                    type="text"
                                    placeholder="Chapter Title"
                                    value={chapter.title}
                                    onChange={(e) => handleChapterChange(index, e)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
                                    required
                                />
                                {chapter.pages.map((page, pageIndex) => (
                                    <div key={pageIndex} className="flex space-x-2">
                                        <input
                                            type="text"
                                            placeholder={`Page ${pageIndex + 1}`}
                                            value={page}
                                            onChange={(e) => handlePageChange(index, pageIndex, e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            required
                                        />
                                        <button type="button" onClick={() => removePage(index, pageIndex)} className="text-red-500">
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <div className="flex justify-center mt-2">
                                <button type="button" onClick={() => addPage(index)} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
                                    + Add Page
                                </button>
                                <button type="button" onClick={() => removeChapter(index)} className="ml-2 mt-2 bg-red-500 text-white px-2 py-1 rounded">
                                    ✕ Remove Chapter
                                </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addChapter} className="bg-[#101828] text-white px-3 py-1 rounded">
                            + Add Chapter
                        </button>
                    </div>

                    {/* ✅ Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
                        >
                            Cancel
                        </button>
                        {item ? (
                            <button
                                type="submit"
                                onClick={handleUpdate}
                                className="bg-gray-200 text-white px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
                            >
                                Update Book
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={handleAdd}
                                className="bg-gray-200 text-gray-400  px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition"
                            >
                                Add Book
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;

