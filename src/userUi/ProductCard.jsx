// src/buy/ProductCard.jsx
export default function ProductCard({ item, onClick, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer ${className}`}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(item)}
      aria-label={`View ${item.name}`}
    >
      <div className="relative h-40">
        <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover rounded-t-xl" />
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-500">{item.brand || "FarmFresh"}</div>
        <div className="font-medium text-gray-900 line-clamp-1">{item.name}</div>
        <div className="text-emerald-700 font-semibold mt-1">₹{item.price}</div>
        <div className="text-[11px] text-gray-500 mt-1">Available: {item.stock} kg</div>
      </div>
    </div>
  );
}
