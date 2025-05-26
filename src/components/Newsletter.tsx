import React, { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("https://bookhub-back.onrender.com/subscribe", { email });
      setMessage(response.data.message);
      setEmail(""); 
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F3F2EC] py-40 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-sm leading-tight">
            Subscribe To <br /> Our Newsletter
          </h2>
          <div className="w-12 h-1 bg-yellow-700 mt-2"></div>
        </div>

        <div className="md:w-1/2">
          <p className="text-gray-600 mb-4">
            Move towards ease and comfort, free yourself as you aim for success.
            Excellence in learning leads to growth and achievement.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex items-center border-b border-gray-400 pb-2 w-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address here"
              className="flex-1 bg-transparent text-gray-800 focus:outline-none text-lg"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="ml-3 flex items-center text-black font-sm"
              disabled={loading}
            >
              {loading ? "SENDING..." : "SEND"} <Send className="ml-2 w-5 h-5" />
            </button>
          </form>

          {message && (
            <p className={`mt-2 text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
