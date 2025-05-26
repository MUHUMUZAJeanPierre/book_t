import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import  '../../src/index.css'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF7F2] bg-no-repeat bg-cover bg-center relative p-4">
      <div className="absolute inset-0 bg-cover bg-center hero">
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      {/* Auth Container */}
      <div className="bg-white shadow-lg rounded-md p-8 sm:p-14 max-w-sm sm:max-w-md w-full relative z-10">
        {/* Tab Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`text-sm font-semibold px-4 py-2 rounded-t-md transition ${
              isLogin ? "border-b-4 border-gray-700 text-black" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-sm font-semibold px-4 py-2 rounded-t-md transition ${
              !isLogin ? "border-b-4 border-gray-700 text-black" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? <Login /> : <Register setIsLogin={setIsLogin} />}

        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-gray-500 hover:underline"
              >
                Register
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-gray-500 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
