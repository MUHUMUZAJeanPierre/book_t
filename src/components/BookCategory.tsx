import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
}

const BookCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const allBooks: Book[] = [
      { id: 1, title: "Business Book 1", author: "Author A", category: "business" },
      { id: 2, title: "Tech Guide", author: "Author B", category: "technology" },
      { id: 3, title: "Love Story", author: "Author C", category: "romantic" },
      { id: 4, title: "Fantasy World", author: "Author D", category: "fictional" },
    ];

    const filteredBooks =
      category?.toLowerCase() === "all genres"
        ? allBooks
        : allBooks.filter((book) => book.category.toLowerCase() === category?.toLowerCase());

    setBooks(filteredBooks);
  }, [category]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">
        {category?.toLowerCase() === "all genres" ? "All Books" : `Books in ${category}`}
      </h2>
      <ul className="mt-4">
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="p-4 border rounded-md my-2 shadow-md">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No books found in this category.</p>
        )}
      </ul>
    </div>
  );
};

export default BookCategory;
