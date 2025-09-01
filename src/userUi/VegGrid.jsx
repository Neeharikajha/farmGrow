// src/webpage/VegGrid.jsx
import VegCard from "./VegCard";

export default function VegGrid({ items, onAdd, className = "" }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ${className}`}>
      {items.map((v) => (
        <VegCard key={v.id} v={v} onAdd={onAdd} />
      ))}
    </div>
  );
}
