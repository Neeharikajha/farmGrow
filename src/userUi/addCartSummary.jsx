export default function AddCartSummary({
  subtotal,
  delivery = 0,
  onCheckout,
  className = "",
}) {
  const total = subtotal + delivery;

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 ${className}`}>
      <div className="text-sm font-semibold text-gray-900 mb-3">Order Summary</div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery</span>
          <span className="font-medium text-gray-900">{delivery === 0 ? "Free" : `₹${delivery.toLocaleString("en-IN")}`}</span>
        </div>
        <div className="border-t pt-2 flex justify-between">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-semibold text-gray-900">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="mt-4 w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 text-sm font-semibold"
      >
        Checkout
      </button>
      <p className="mt-2 text-[11px] text-gray-500">
        Buy with confidence – 100% money‑back guarantee.
      </p>
    </div>
  );
}
