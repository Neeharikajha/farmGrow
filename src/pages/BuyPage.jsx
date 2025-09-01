import React from "react";
import Navbar from "../webpage/Navbar";
import BaseCardVegie from "../userUi/baseCardVegie";

export default function UserShop() {
  const carrot = {
    id: 2,
    brand: "fresho!",
    name: "Carrot - Orange (Loose)",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
    variants: [
      { id: "250g", label: "250 g", price: 10.26, mrp: 12.82, offPct: 20 },
      { id: "500g", label: "500 g", price: 19.85, mrp: 24.81, offPct: 20 },
      { id: "1kg",  label: "1 kg",  price: 49.31, mrp: 61.64, offPct: 20 },
    ],
  };

  const items = [carrot, carrot, carrot, carrot]; // example 4 cards

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex-1">
        <div className="flex flex-wrap -mx-2">
          {items.map((item, idx) => (
            <div key={idx} className="px-2 w-full sm:w-1/2 md:w-1/4">
              <BaseCardVegie item={item} defaultVariantId="1kg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
