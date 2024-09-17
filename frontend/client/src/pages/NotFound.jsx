import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-white px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-10">
        <Link
          to="/"
          className="relative inline-block text-sm font-medium text-purple-500 group focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform transform translate-x-0.5 translate-y-0.5 bg-white group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span className="relative block px-8 py-3 bg-purple-500 border border-current text-white">
            Go Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
