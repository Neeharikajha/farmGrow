// import React, { useState } from "react";
// import Navbar from "../webpage/Navbar";
// import CartItems from "../webpage/CartItems";

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const [showCart, setShowCart] = useState(true);

//   const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
//   const toggleCart = () => setShowCart((v) => !v);

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex flex-col">
//       <Navbar cartCount={cart.length} toggleCart={toggleCart} />

//       <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-6 flex-1">
//         {showCart ? (
//           <CartItems cart={cart} removeFromCart={removeFromCart} total={total} />
//         ) : (
//           <div className="text-center text-gray-500">Your cart is empty</div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/CartPage.jsx
import React from "react";
import Navbar from "../webpage/Navbar";

export default function CartPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Mai CartPage hu
        </h1>
      </div>
    </div>
  );
}
