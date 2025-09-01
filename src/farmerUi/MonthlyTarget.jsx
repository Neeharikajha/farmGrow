// // src/farmerUi/MonthlyTarget.jsx
// import React, { useMemo } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function MonthlyTarget({
//   className = "",
//   target = 25000, // $25k
//   revenue = 18000, // $18k
//   today = 1800,    // $1.8k
//   percent = 75.34, // completion %
//   deltaPct = 12,   // +12%
// }) {
//   const filled = Math.min(Math.max(percent, 0), 100);
//   const empty = 100 - filled;

//   const data = useMemo(
//     () => ({
//       labels: ["Completed", "Remaining"],
//       datasets: [
//         {
//           data: [filled, empty],
//           backgroundColor: ["#8b5cf6", "#e5e7eb"], // violet-500 + gray-200
//           borderWidth: 0,
//         },
//       ],
//     }),
//     [filled, empty]
//   );

//   const options = useMemo(
//     () => ({
//       responsive: true,
//       maintainAspectRatio: false,
//       cutout: "70%",
//       rotation: -Math.PI,         // start at 180°
//       circumference: Math.PI,     // show 180° (half circle)
//       plugins: {
//         legend: { display: false },
//         tooltip: { enabled: false },
//       },
//     }),
//     []
//   );

//   return (
//     <div className={`w-full bg-white rounded-2xl shadow p-4 ${className}`}>
//       <div className="flex items-start justify-between mb-1">
//         <div className="text-sm font-semibold text-gray-800">Monthly Target</div>
//         <button className="h-6 w-6 grid place-content-center rounded hover:bg-gray-100 text-gray-500" aria-label="More options">⋮</button>
//       </div>
//       <div className="text-xs text-gray-500 mb-3">Target you’ve set for each month</div>

//       <div className="relative h-36">
//         <Doughnut data={data} options={options} />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-xl font-semibold text-gray-900">{filled.toFixed(2)}%</div>
//             <div className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full ${deltaPct >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
//               {deltaPct >= 0 ? "▲" : "▼"} {Math.abs(deltaPct)}%
//             </div>
//           </div>
//         </div>
//       </div>

//       <p className="text-xs text-gray-600 mt-3">
//         You earn ${(today + revenue).toLocaleString()} today, it’s {deltaPct >= 0 ? "higher" : "lower"} than last month — keep up the good trends!
//       </p>

//       <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
//         <div>
//           <div className="text-gray-500 text-xs">Target</div>
//           <div className="font-semibold text-gray-900">${(target/1000).toFixed(0)}k</div>
//         </div>
//         <div>
//           <div className="text-gray-500 text-xs">Revenue</div>
//           <div className="font-semibold text-gray-900">${(revenue/1000).toFixed(0)}k</div>
//         </div>
//         <div>
//           <div className="text-gray-500 text-xs">Today</div>
//           <div className="font-semibold text-gray-900">${(today/1000).toFixed(1)}k</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlyTarget({
  className = "",
  target = 25000,
  revenue = 18000,
  today = 1800,
  percent = 75.34,
  deltaPct = 12,
}) {
  const filled = Math.min(Math.max(percent, 0), 100);
  const empty = 100 - filled;

  const data = useMemo(() => ({
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [filled, empty],
        backgroundColor: ["#8b5cf6", "#e5e7eb"], // violet + gray
        borderWidth: 0,
      },
    ],
  }), [filled, empty]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    rotation: -90 * (Math.PI / 180),    // start at left (-90°)
    circumference: 180 * (Math.PI / 180), // 180° semi-circle
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  }), []);

  return (
    <div className={`w-full bg-white rounded-2xl shadow p-4 ${className}`}>
      <div className="flex items-start justify-between mb-1">
        <div className="text-sm font-semibold text-gray-800">Monthly Target</div>
        <button className="h-6 w-6 grid place-content-center rounded hover:bg-gray-100 text-gray-500" aria-label="More options">⋮</button>
      </div>
      <div className="text-xs text-gray-500 mb-3">Target you’ve set for each month</div>

      <div className="relative h-36">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center -translate-y-2">
          <div className="text-center">
            <div className="text-xl font-semibold text-gray-900">{filled.toFixed(1)}%</div>
            <div className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full mt-1 ${deltaPct >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {deltaPct >= 0 ? "▲" : "▼"} {Math.abs(deltaPct)}%
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-3">
        You earn ${(today + revenue).toLocaleString()} today, it’s {deltaPct >= 0 ? "higher" : "lower"} than last month — keep up the good trends!
      </p>

      <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
        <div>
          <div className="text-gray-500 text-xs">Target</div>
          <div className="font-semibold text-gray-900">${(target/1000).toFixed(0)}k</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Revenue</div>
          <div className="font-semibold text-gray-900">${(revenue/1000).toFixed(0)}k</div>
        </div>
        <div>
          <div className="text-gray-500 text-xs">Today</div>
          <div className="font-semibold text-gray-900">${(today/1000).toFixed(1)}k</div>
        </div>
      </div>
    </div>
  );
}
