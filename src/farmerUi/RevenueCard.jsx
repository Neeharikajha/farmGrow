// RevenueCard.jsx
export default function RevenueCard({ revenue, growth }) {
  return (
    <div className="bg-white rounded-xl shadow px-5 py-4 mb-4">
      <div className="text-gray-500 text-xs">Total Revenue</div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-emerald-700">{revenue}</span>
        <span className={`text-sm ml-2 ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
          {growth >= 0 ? "+" : ""}{growth}%
        </span>
      </div>
      <div className="text-xs text-gray-400">Compared to last month</div>
    </div>
  );
}
