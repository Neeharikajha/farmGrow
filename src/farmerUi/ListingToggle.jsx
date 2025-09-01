import { useState } from "react";

export default function ListingToggle({ trending, listed, onAddEditClick }) {
  const [showTrending, setShowTrending] = useState(true);
  const items = showTrending ? trending : listed;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col w-full min-h-[280px]">
      <div className="flex items-center justify-between mb-5 gap-3">
        <div className="flex gap-3">
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              showTrending ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setShowTrending(true)}
          >
            Trending
          </button>
          <button
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              !showTrending ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setShowTrending(false)}
          >
            My Listings
          </button>
        </div>
        <button
          className="px-5 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors duration-200"
          onClick={onAddEditClick}
        >
          Add / Edit Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 font-medium text-gray-700">Item Name</th>
              <th className="px-4 py-3 font-medium text-gray-700 text-right">Revenue</th>
              <th className="px-4 py-3 font-medium text-gray-700 text-right">Sold</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 5).map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-gray-600 text-right">₹{item.revenue.toLocaleString()}</td>
                <td className="px-4 py-3 text-gray-600 text-right">{item.sold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
