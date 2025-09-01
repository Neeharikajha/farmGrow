export default function RevenueCard({ revenue, growth }) {
  return (
    <div className="bg-white rounded-xl shadow px-6 py-7 mb-4 min-h-[120px]">
      <div className="text-gray-500 text-xs">Total Revenue</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-2xl font-bold text-emerald-700">{revenue}</span>
        <span className={`text-sm ml-2 ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
          {growth >= 0 ? "+" : ""}{growth}%
        </span>
      </div>
      <div className="text-xs text-gray-400 mt-2">Compared to last month</div>
    </div>
  );
}
