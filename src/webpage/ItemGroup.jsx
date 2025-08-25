import React from "react";
import SingleItem from "./SingleItem";

const ItemGroup = ({ vegetables, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {vegetables.map((veg) => (
        <SingleItem key={veg.id} veg={veg} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ItemGroup;
