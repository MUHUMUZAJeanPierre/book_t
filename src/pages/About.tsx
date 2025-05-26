import React from "react";
import img_1 from "../assets/book_2 (1).png"

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-[#FAF7F2] px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-bold leading-tight">About Us</h2>
          <div className="w-12 h-1 bg-yellow-700 mt-2"></div>
          <p className="text-gray-700 mt-4 leading-relaxed">
            We are passionate about bringing the best books to readers worldwide. Our mission is to provide an 
            enriching collection of books across various genres, helping people discover new stories, ideas, and knowledge.
          </p>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Whether you love fiction, business, or adventure books, our platform ensures you find the perfect book 
            for your interests. Join us on this journey of discovery!
          </p>
        </div>

        <div className="md:w-1/2">
          <img
            src={img_1}
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
