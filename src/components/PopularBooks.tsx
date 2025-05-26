import React, { useState } from "react";
import img_1 from "../assets/book_2 (1).png";
import img_2 from "../assets/book_2 (2).png";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  category: string;
}

const books: Book[] = [
  { id: 1, title: "Peaceful Enlightment", author: "Marmik Lama", price: "$00.00", imageUrl: img_1, category: "Business" },
  { id: 2, title: "Great Travel At Desert", author: "Sanchit Howdy", price: "$00.00", imageUrl: img_2, category: "Business" },
  { id: 3, title: "Life Among The Pirates", author: "Armor Ramsey", price: "$00.00", imageUrl: img_1, category: "Technology" },
  { id: 4, title: "Simple Way Of Piece Life", author: "Armor Ramsey", price: "$00.00", imageUrl: img_2, category: "Romantic" },
  { id: 5, title: "Great Travel At Desert", author: "Sanchit Howdy", price: "$00.00", imageUrl: img_2, category: "Fictional" },
  { id: 6, title: "Life Among The Pirates", author: "Armor Ramsey", price: "$00.00", imageUrl: img_1, category: "Adventure" },
];

const categories = ["All Genres", "Business", "Technology", "Romantic", "Adventure", "Fictional"];

const PopularBooks: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Genres");

  const filteredBooks = selectedCategory === "All Genres" ? books : books.filter(book => book.category === selectedCategory);

  return (
    <section id="popular" className="py-12 bg-[#FAF7F2] text-center">
      <h3 className="text-sm text-gray-500 uppercase tracking-wide">Some Quality Items</h3>
      <h2 className="text-3xl font-sm mt-2 mb-10">Popular Books</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6 px-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-sm font-medium px-3 py-1 rounded-md transition ${
              selectedCategory === category
                ? "underline font-bold text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-[#F8F5EF] p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img src={book.imageUrl} alt={book.title} className="w-full h-auto rounded-md" />
            <h3 className="text-lg font-medium mt-4">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">{book.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-sm">Quote Of The Day</h3>
        <p className="mt-4 text-lg italic text-gray-700 max-w-3xl mx-auto">
          “The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”
        </p>
        <p className="mt-2 text-sm font-medium">Dr. Seuss</p>
      </div>
    </section>
  );    
};

export default PopularBooks;
