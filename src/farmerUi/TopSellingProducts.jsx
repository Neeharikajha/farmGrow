import { FiFilter } from "react-icons/fi";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

const SAMPLE_ROWS = [
  { id: 1, name: "Premium Wheat (Aata)", price: 28.5,  unit: "₹/kg",       category: "Grains",     qty: 1280, amount: 364715 },
  { id: 2, name: "Tomato (Hybrid)",       price: 32.0,  unit: "₹/kg",       category: "Vegetables", qty: 890,  amount: 284700 },
  { id: 3, name: "Basmati Rice",          price: 85.0,  unit: "₹/kg",       category: "Grains",     qty: 740,  amount: 631000 },
  { id: 4, name: "Cotton (Lint)",         price: 6200,  unit: "₹/quintal",  category: "Cash Crop",  qty: 69,   amount: 427800 },
  { id: 5, name: "Groundnut (Shelled)",   price: 6200,  unit: "₹/quintal",  category: "Oilseeds",   qty: 65,   amount: 403000 },
  { id: 6, name: "Green Chilli",          price: 55.0,  unit: "₹/kg",       category: "Vegetables", qty: 580,  amount: 319000 },
];

export default function TopSellingProducts({ className = "", rows = SAMPLE_ROWS }) {
  const navigate = useNavigate();

  // Filter UI state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [cat, setCat] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(() => {
    const set = new Set(rows.map(r => r.category));
    return ["All", ...Array.from(set)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    return rows.filter(r => {
      const catOk = cat === "All" || r.category === cat;
      const priceOk =
        (isNaN(min) ? true : r.price >= min) &&
        (isNaN(max) ? true : r.price <= max);
      return catOk && priceOk;
    });
  }, [rows, cat, minPrice, maxPrice]);

  const goToPost = () => navigate("/post");
  const onRowClick = () => navigate("/post"); 

  const resetFilters = () => {
    setCat("All");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className={`w-full bg-white rounded-2xl shadow p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-800">Top Selling Products</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            onClick={() => setFiltersOpen(v => !v)}
            aria-expanded={filtersOpen}
            aria-controls="ts-filters"
          >
            <FiFilter className="h-4 w-4" /> Filter
          </button>
          <button
            type="button"
            className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
            onClick={goToPost}
          >
            See All
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div id="ts-filters" className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min Price</label>
            <input
              type="number"
              inputMode="decimal"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. 50"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max Price</label>
            <input
              type="number"
              inputMode="decimal"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="e.g. 5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="sm:col-span-3 flex gap-2">
            <button
              type="button"
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => setFiltersOpen(false)}
            >
              Apply
            </button>
            <button
              type="button"
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-xs text-gray-500">
            <tr className="border-b">
              <th className="text-left py-2 px-2">Product</th>
              <th className="text-left py-2 px-2">Price</th>
              <th className="text-left py-2 px-2">Category</th>
              <th className="text-left py-2 px-2">Quantity</th>
              <th className="text-left py-2 px-2">Amount</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredRows.map((r) => (
              <tr
                key={r.id}
                className="border-b last:border-0 hover:bg-gray-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                onClick={onRowClick}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onRowClick()}
                aria-label={`Edit ${r.name}`}
              >
                <td className="py-2 px-2">
                  <span className="font-medium text-gray-800 line-clamp-1">{r.name}</span>
                </td>
                <td className="py-2 px-2">
                  <span className="text-gray-800">{r.price}</span>
                  <span className="text-gray-400 text-xs ml-1">{r.unit}</span>
                </td>
                <td className="py-2 px-2">{r.category}</td>
                <td className="py-2 px-2">{r.qty.toLocaleString("en-IN")}</td>
                <td className="py-2 px-2">{inr.format(r.amount)}</td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr><td className="py-6 px-2 text-sm text-gray-500" colSpan={5}>No items match the current filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-[11px] text-gray-500 text-center">
        Prices shown are sample Mandi-style rates; adjust with actual listings, quantity units (kg/quintal), and net amount in INR.
      </div>
    </div>
  );
}
