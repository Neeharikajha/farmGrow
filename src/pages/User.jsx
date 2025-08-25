import React, { useState } from "react";
import Navbar from "../webpage/Navbar";
import ItemGroup from "../webpage/ItemGroup";
import CartItems from "../webpage/CartItems";
// import HeroSectionUser from "../webpage/HeroSectionUser";
const User = () => {
  const vegetables = [
    { id: 1, name: "Tomato", price: 20, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Potato", price: 15, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Carrot", price: 25, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Cabbage", price: 30, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Onion", price: 18, image: "https://via.placeholder.com/150" },
  ];

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (veg, quantity) => {
    setCart((prevCart) => {
      if (quantity === 0) {
        return prevCart.filter((item) => item.id !== veg.id);
      }

      const exists = prevCart.find((item) => item.id === veg.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === veg.id ? { ...item, quantity } : item
        );
      }

      return [...prevCart, { ...veg, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const toggleCart = () => setShowCart((prev) => !prev);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        toggleCart={toggleCart}
      />
      <div className="p-6 flex-1 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to FarmGrow 🥦</h1>
        {/* <HeroSectionUser/> */}
        <ItemGroup vegetables={vegetables} addToCart={addToCart} />
        {showCart && (
          <CartItems cart={cart} removeFromCart={removeFromCart} total={total} />
        )}
      </div>
    </div>
  );
};

export default User;
