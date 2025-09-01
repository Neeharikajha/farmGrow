import React, { useState } from "react";
import Navbar from "../webpage/Navbar";
import CartItems from "../userUi/CartItems";

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Tomato (Hybrid) 1kg",
      price: 24,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1546471180-4b6e1c9a7f0c?w=400",
    },
    {
      id: 2,
      name: "Potato 1kg",
      price: 22,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    },
  ]);

  const [showCart, setShowCart] = useState(true);

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const toggleCart = () => setShowCart((v) => !v);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar
        cartCount={cart.reduce((a, i) => a + i.qty, 0)}
        toggleCart={toggleCart}
      />

      {/* Main Container (same alignment as Navbar) */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {showCart ? (
          <CartItems
            cart={cart}
            setCart={setCart}
            removeFromCart={removeFromCart}
            total={total}
          />
        ) : (
          <div className="text-center text-gray-500">
            Your cart is empty
          </div>
        )}
      </main>
    </div>
  );
}
