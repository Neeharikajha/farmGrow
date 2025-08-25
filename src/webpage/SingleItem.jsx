import React, { useState, useEffect } from "react";

const SingleItem = ({ veg, addToCart, onNegotiate }) => {
  const [qty, setQty] = useState(0);

  const handleAdd = () => setQty(qty + 1);
  const handleSub = () => setQty(qty > 0 ? qty - 1 : 0);

  // Update cart whenever qty changes
  useEffect(() => {
    addToCart?.(veg, qty);
  }, [qty]);

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Image */}
      <div className="flex items-center justify-center px-6 pt-6">
        <img
          src={veg.image}
          alt={veg.name}
          className="h-40 object-contain"
          loading="lazy"
        />
      </div>

      <hr className="mt-6 border-gray-200" />

      {/* Content */}
      <div className="space-y-3 p-6">
        <h2 className="text-[18px] font-semibold text-gray-900">{veg.name}</h2>

        {/* Rating */}
        {(veg?.rating || veg?.reviews) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{veg.rating ?? "5.0"}</span>
            {veg?.reviews && <span className="text-gray-500">({veg.reviews} Reviews)</span>}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{veg.price?.toFixed ? veg.price.toFixed(2) : veg.price}
            </span>
            {veg?.oldPrice && veg.oldPrice > veg.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{veg.oldPrice}
              </span>
            )}
          </div>

          {/* Quantity / Add to cart */}
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition"
            >
              Add to cart
            </button>
          ) : (
            <div className="inline-flex items-center gap-2">
              <button
                onClick={handleSub}
                className="h-9 w-9 rounded-lg border border-gray-300 text-lg font-bold text-gray-700 hover:bg-gray-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-6 text-center text-base font-semibold">{qty}</span>
              <button
                onClick={handleAdd}
                className="h-9 w-9 rounded-lg bg-emerald-700 text-lg font-bold text-white hover:bg-emerald-800"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Negotiate button */}
        <button
          onClick={() => onNegotiate?.(veg)}
          className="mt-3 w-full rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition"
        >
          Negotiate
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
