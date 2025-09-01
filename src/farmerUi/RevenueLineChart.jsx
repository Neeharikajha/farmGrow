import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function RevenueLineChart({ className = "" }) {
  const fullLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [visibleMonths, setVisibleMonths] = useState(6); // show first 6 by default
  const chartRef = useRef(null);

  const data = useMemo(
    () => ({
      labels: fullLabels,
      datasets: [
        {
          label: "This Week",
          data: [120000, 90000, 110000, 170000, 200000, 190000, 0, 0, 0, 0, 0, 0],
          tension: 0.35,
          borderColor: "#10b981",
          backgroundColor: "rgba(16,185,129,0.15)",
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2,
          spanGaps: true,
        },
        {
          label: "Last Week",
          data: [80000, 160000, 130000, 110000, 130000, 220000, 0, 0, 0, 0, 0, 0],
          tension: 0.35,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.15)",
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2,
          spanGaps: true,
        },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: {
          position: "top",
          labels: { usePointStyle: true, boxWidth: 10, font: { size: 13 } },
        },
        tooltip: {
          padding: 10,
          titleFont: { size: 14, weight: "600" },
          bodyFont: { size: 13 },
          backgroundColor: "#1f2937",
          titleColor: "#fff",
          bodyColor: "#fff",
          callbacks: {
            label: (ctx) => `₹${ctx.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 13, weight: "500" }, color: "#374151" },
          min: 0,
          max: visibleMonths - 1, // control visible months dynamically
        },
        y: {
          beginAtZero: true,
          ticks: {
            callback: (v) => `₹${(v / 1000).toLocaleString()}k`,
            font: { size: 12 },
            color: "#374151",
          },
          grid: { color: "rgba(0,0,0,0.05)" },
        },
      },
    }),
    [visibleMonths]
  );

  // Add mouse enter/leave events to chart canvas
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const canvas = chart.canvas;
    const handleMouseEnter = () => setVisibleMonths(12);
    const handleMouseLeave = () => setVisibleMonths(6);

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`w-full h-96 bg-white rounded-2xl shadow-md p-5 ${className}`}>
      <div className="text-lg font-semibold text-gray-800 mb-3">Revenue (₹)</div>
      <div className="h-[calc(100%-2rem)]">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
