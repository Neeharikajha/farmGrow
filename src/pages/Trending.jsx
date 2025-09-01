import React from "react";
import Navbar from "../webpage/Navbar";

export default function Trending() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex-1">
        <h1 className="text-2xl font-semibold text-gray-800">Trending Products</h1>
        <p className="mt-4 text-gray-600">Coming soon: trending items, most popular, top-rated etc.</p>
      </div>
    </div>
  );
}
