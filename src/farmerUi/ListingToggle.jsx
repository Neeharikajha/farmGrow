// ListingToggle.jsx
import { useState } from "react";
import { Switch } from "@material-tailwind/react"; // Or you can use Flowbite/your own

export default function ListingToggle({
  trending, listed, onAddEditClick
}) {
  const [showTrending, setShowTrending] = useState(true);
  const items = showTrending ? trending : listed;

  return (
    <div className="bg-white rounded-xl shadow px-5 py-4 flex flex-col">
      <div className="flex items-center mb-3 justify-between">
        <div className="flex gap-3">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              showTrending ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
            }`} onClick={() => setShowTrending(true)}
          >Trending</button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              !showTrending ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700"
            }`} onClick={() => setShowTrending(false)}
          >My Listings</button>
        </div>
        <button
          className="px-2 py-1 bg-emerald-500 text-white rounded-lg text-xs ml-auto"
          onClick={onAddEditClick}
        >
          Add / Edit Item
        </button>
      </div>
      <ul>
        {items.slice(0, 5).map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div>
              <div className="font-medium text-gray-800">{item.name}</div>
              <div className="text-xs text-gray-400">Revenue: {item.revenue} | Sold: {item.sold}</div>
            </div>
            <button className="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
