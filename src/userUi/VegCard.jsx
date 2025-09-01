// src/webpage/VegCard.jsx
export default function VegCard({ v, onAdd, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow overflow-hidden ${className}`}>
      <div className="relative h-44">
        <img src={v.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {v.isOrganic && (
          <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white">
            Organic
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-500">{v.category}</div>
        <div className="font-medium text-gray-900 line-clamp-1">{v.name}</div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-emerald-700 font-semibold">₹{v.pricePerKg}/kg</div>
          <div className="text-[11px] text-gray-500">⭐ {v.rating.toFixed(1)}</div>
        </div>
        <button
          className="mt-3 w-full text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2"
          onClick={() => onAdd(v)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
