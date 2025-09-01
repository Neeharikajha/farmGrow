// src/webpage/addCartRecommendations.jsx
export default function AddCartRecommendations({ items = [], onAdd }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="text-sm font-semibold text-gray-900 mb-3">
        You may also be interested in
      </div>

      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-gray-100 p-3 flex items-center justify-between gap-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img src={p.image} alt="" className="h-12 w-12 rounded object-cover" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                <div className="text-xs text-gray-500">₹{p.price}</div>
              </div>
            </div>
            <button
              onClick={() => onAdd(p)}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
