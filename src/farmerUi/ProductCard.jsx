import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCard({ item, onEdit, onDelete }) {
  return (
    <div className="relative h-64 w-full border rounded-xl bg-white shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* image */}
      <div className="relative h-36 w-full">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        {/* Availability tag */}
        <span
          className={`absolute top-2 left-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
            item.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.available ? "Available" : "Not available"}
        </span>
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="bg-white/90 p-1 rounded-full shadow hover:bg-emerald-100"
          >
            <Pencil className="w-4 h-4 text-emerald-600" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="bg-white/90 p-1 rounded-full shadow hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col">
        <p className="font-semibold text-base truncate">{item.name}</p>
        <p className="text-sm text-gray-600 mt-1">
          Quantity: {item.offeredQuantity}
        </p>
        <p className="text-sm text-gray-900 font-medium mt-1">
          Price: ₹{item.price}
        </p>
        <div className="flex-1" />
      </div>
    </div>
  );
}
