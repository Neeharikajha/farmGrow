import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsGrid({ items, onAdd, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Add New Item card */}
      <button
        onClick={onAdd}
        className="h-64 w-full cursor-pointer border-2 border-dashed border-emerald-500 rounded-xl p-6 flex flex-col items-center justify-center text-emerald-700 hover:bg-emerald-50 transition"
      >
        <div className="text-4xl leading-none mb-2">＋</div>
        <div className="font-semibold text-lg">Add New Item</div>
        <p className="text-sm text-emerald-700/70 mt-1">
          Picture, name, price & quantity
        </p>
      </button>

      {/* Existing products */}
      {items.map((item) => (
        <ProductCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
