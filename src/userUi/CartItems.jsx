import { useMemo, useState } from "react";
import AddCartItemRow from "../userUi/addCartItemRow";
import AddCartSummary from "../userUi/addCartSummary";
import AddCartRecommendations from "../userUi/addCartRecommendations";
import AddCartCheckoutModal from "../userUi/addCartCheckoutModal";

export default function CartItems({
  cart,
  setCart,
  removeFromCart,
  total,
}) {
  const [open, setOpen] = useState(false);

  const onQtyChange = (id, qty) => {
    setCart?.((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart]
  );

  const recos = [
    {
      id: "r1",
      name: "Fresh Coriander (Dhaniya) 100g",
      price: 12,
      image:
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400",
    },
    {
      id: "r2",
      name: "Green Chilli 250g",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=400",
    },
  ];

  const addReco = (p) => {
    setCart?.((prev) => {
      const f = prev.find((x) => x.id === p.id);
      if (f) {
        return prev.map((x) =>
          x.id === p.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-3">
        <h2 className="text-base font-semibold text-gray-900">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No items yet.</p>
        ) : (
          cart.map((item) => (
            <AddCartItemRow
              key={item.id}
              item={item}
              onQtyChange={onQtyChange}
              onRemove={removeFromCart}
            />
          ))
        )}

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-[12px] text-gray-600">
          <span>🛡️</span> Buy with confidence – 100% no-risk money-back
          guarantee
        </div>

        <button className="self-start text-xs text-red-600 hover:underline">
          Cancel Order
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-20 h-fit">
        <AddCartSummary
          subtotal={subtotal}
          delivery={0}
          onCheckout={() => setOpen(true)}
        />
        <AddCartRecommendations items={recos} onAdd={addReco} />
      </div>

      <AddCartCheckoutModal open={open} setOpen={setOpen} />
    </div>
  );
}
