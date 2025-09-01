import React from "react";

function SingleCardTransaction({ title, value, subtitle, highlight, highlightColor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
        {title}
      </div>
      <div className="mt-2">
        <div className="text-gray-900 text-2xl font-bold">{value}</div>
        {subtitle && <div className="text-gray-400 text-xs mt-1">{subtitle}</div>}
      </div>
      {highlight && (
        <div
          className={`mt-3 inline-block px-2 py-1 text-xs font-semibold rounded-full ${highlightColor || "bg-green-100 text-green-700"}`}
        >
          {highlight}
        </div>
      )}
    </div>
  );
}
export default SingleCardTransaction;