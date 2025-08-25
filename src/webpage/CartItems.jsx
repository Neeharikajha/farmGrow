import React from "react";

const CartItems = ({ cart, removeFromCart, total }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart 🛒</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded bg-white"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>
                  ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <h3 className="text-xl font-bold">Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
};

export default CartItems;
