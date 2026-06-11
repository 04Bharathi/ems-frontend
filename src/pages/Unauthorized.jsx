import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <FaLock className="text-red-500 text-5xl mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          403 - Unauthorized
        </h1>

        <p className="text-gray-600 mb-6">
          You do not have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;