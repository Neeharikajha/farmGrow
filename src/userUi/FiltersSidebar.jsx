// src/webpage/FiltersSidebar.jsx
export default function FiltersSidebar({
  className = "",
  filters,
  setFilters,
  categories = [],
}) {
  const onChange = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <aside className={`w-full bg-white rounded-2xl shadow p-4 h-max ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-800">Filter</div>
        <button
          className="text-xs text-emerald-700 hover:underline"
          onClick={() =>
            setFilters({ category: "All", organic: "Any", min: "", max: "", rating: 0, colors: [] })
          }
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Category</div>
        <select
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
        >
          {["All", ...categories].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Organic */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Organic</div>
        <div className="flex gap-2">
          {["Any", "Yes", "No"].map((v) => (
            <button
              key={v}
              onClick={() => onChange("organic", v)}
              className={`px-3 py-1.5 rounded-lg text-xs border ${
                filters.organic === v ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Price (₹/kg)</div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="decimal"
            placeholder="Min"
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.min}
            onChange={(e) => onChange("min", e.target.value)}
          />
          <input
            type="number"
            inputMode="decimal"
            placeholder="Max"
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={filters.max}
            onChange={(e) => onChange("max", e.target.value)}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-2">
        <div className="text-xs text-gray-500 mb-2">Min rating</div>
        <select
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={filters.rating}
          onChange={(e) => onChange("rating", Number(e.target.value))}
        >
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <option key={r} value={r}>
              {r === 0 ? "Any" : `${r}+`}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
