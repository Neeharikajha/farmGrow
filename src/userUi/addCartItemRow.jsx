
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

export default function AddCartItemRow({ item, onQtyChange, onRemove }) {
  const handleDecrease = () =>
    onQtyChange(item.id, Math.max(1, item.qty - 1));

  const handleIncrease = () => onQtyChange(item.id, item.qty + 1);

  const handleRemove = () => onRemove(item.id);

  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-lg border border-gray-100 object-cover"
      />

      {/* Product Details */}
      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-start justify-between gap-3">
          {/* Title & Variant */}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500">{item.variant || "1 kg"}</p>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemove}
            className="rounded p-2 text-gray-500 hover:bg-gray-50"
            aria-label={`Remove ${item.name} from cart`}
          >
            <FiTrash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Quantity & Price */}
        <div className="mt-3 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDecrease}
              className="grid h-8 w-8 place-content-center rounded-lg border border-gray-200 hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <span className="grid h-8 min-w-[40px] place-content-center rounded-lg border border-gray-200 px-3 text-sm font-semibold">
              {item.qty}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              className="grid h-8 w-8 place-content-center rounded-lg border border-gray-200 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              ₹{(item.price * item.qty).toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-gray-500">
              ₹{item.price}/unit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
