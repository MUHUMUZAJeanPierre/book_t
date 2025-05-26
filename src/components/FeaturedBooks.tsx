import React from "react";
import img_1 from "../assets/book_2 (1).png";
import img_2 from "../assets/book_2 (2).png";
interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Simple Way Of Piece Life",
    author: "Armor Ramsey",
    price: "$00.00",
    imageUrl: img_1,
  },
  {
    id: 2,
    title: "Great Travel At Desert",
    author: "Sanchit Howdy",
    price: "$00.00",
    imageUrl: img_2, 
  },
  {
    id: 3,
    title: "The Lady Beauty Scarlett",
    author: "Arthur Doyle",
    price: "$00.00",
    imageUrl: img_1, 
  },
  {
    id: 4,
    title: "Once Upon A Time",
    author: "Klien Marry",
    price: "$00.00",
    imageUrl: img_2, 
  },
];

const FeaturedBooks: React.FC = () => {
  return (
    <section id="features" className="py-12 bg-[#FAF7F2] text-center">
      <h3 className="text-sm text-gray-500 uppercase tracking-wide">Some Quality Items</h3>
      <h2 className="text-3xl font-sm mb-6">Featured Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {books.map((book) => (
          <div key={book.id} className="bg-[#F8F5EF] p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="relative">
              <img src={book.imageUrl} alt={book.title} className="w-full h-auto rounded-md" />
              <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-sm font-semibold opacity-0 hover:opacity-100 transition">
                READ MORE
              </button>
            </div>
            <h3 className="text-md font-medium mt-4">{book.title}</h3>
            <p className="text-sm text-gray-400">{book.author}</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">{book.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
