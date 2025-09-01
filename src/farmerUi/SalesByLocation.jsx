import React, { useState } from "react";

const states = [
  { name: "Maharashtra", value: 85, region: "West" },
  { name: "Karnataka", value: 72, region: "South" },
  { name: "Tamil Nadu", value: 60, region: "South" },
  { name: "Uttar Pradesh", value: 78, region: "North" },
  { name: "Gujarat", value: 66, region: "West" },
  { name: "West Bengal", value: 55, region: "East" },
  { name: "Rajasthan", value: 48, region: "North" },
  { name: "Kerala", value: 50, region: "South" },
];

const regions = ["All", "North", "South", "East", "West"];

export default function SalesByLocation({ className = "" }) {
  const [filter, setFilter] = useState("All");
  const filteredStates =
    filter === "All" ? states : states.filter((s) => s.region === filter);

  return (
    <div className={`w-full h-96 bg-white rounded-2xl shadow-md p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold text-gray-800">Sales By Location</div>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* State sales list */}
      <div className="space-y-3 overflow-y-auto h-[calc(100%-3.5rem)] pr-2">
        {filteredStates.map((state) => (
          <div key={state.name} className="flex flex-col">
            <div className="flex items-center justify-between text-sm text-gray-700 mb-1">
              <span className="font-medium">{state.name}</span>
              <span className="font-semibold">{state.value}%</span>
            </div>
            <div className="w-full bg-green-50 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${state.value}%`,
                  background: `linear-gradient(90deg, #6ee7b7, #34d399)`,
                }}
                role="progressbar"
                aria-valuenow={state.value}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
