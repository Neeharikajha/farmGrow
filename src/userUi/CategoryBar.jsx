// src/webpage/CategoryBar.jsx
const DEFAULT = ["All", "Leafy", "Root", "Fruit", "Bulb", "Legume", "Gourd", "Herb"];

export default function CategoryBar({ className = "", categories = DEFAULT, selected, onSelect }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex gap-2 min-w-max">
        {categories.map((c) => {
          const active = selected === c;
          return (
            <button
              key={c}
              onClick={() => onSelect(c)}
              className={`px-3 py-1.5 rounded-full text-sm border whitespace-nowrap ${
                active ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
