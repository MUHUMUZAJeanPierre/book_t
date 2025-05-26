import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://bookhub-back.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)
      setLoading(false);

      if (response.ok) {
        alert("Login successful!");

        if (formData.email === "admin@gmail.com" && formData.password === "admin@123") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(`Login failed: ${data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      alert("Error connecting to the server.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-sm mb-2 text-sm">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-sm mb-2 text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-gray-300"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 text-sm rounded-md font-sm hover:bg-gray-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
