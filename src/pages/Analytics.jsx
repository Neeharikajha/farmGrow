import React from "react";
import Sidebar1 from "../farmerUi/own-sidebar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const salesTrend = [
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 300 },
    { name: "Wed", sales: 500 },
    { name: "Thu", sales: 200 },
    { name: "Fri", sales: 600 },
    { name: "Sat", sales: 700 },
    { name: "Sun", sales: 550 },
  ];

  const bestSelling = [
    { name: "Tomatoes", qty: 120 },
    { name: "Potatoes", qty: 98 },
    { name: "Onions", qty: 85 },
    { name: "Carrots", qty: 70 },
  ];

  const revenueByBuyer = [
    { name: "Consumers", value: 65 },
    { name: "Retailers", value: 35 },
  ];

  const COLORS = ["#4F46E5", "#10B981"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <Sidebar1 />
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-64 pl-8 pr-6 py-8 w-full max-w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Sales Analysis Dashboard
        </h1>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Sales Trend */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">Sales Trend (Weekly)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Best-Selling Produce */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">Best-Selling Produce</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bestSelling}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="qty" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Buyer Type */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">Revenue by Buyer Type</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueByBuyer}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {revenueByBuyer.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics & Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Products Card */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">🥇 Top Products</h2>
            <ul className="space-y-2 text-gray-700">
              {bestSelling.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="font-semibold">{item.qty} kg</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparison Metrics */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">
              ⚖️ This Month vs Last Month
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Revenue:</span> +12%
              </p>
              <p>
                <span className="font-semibold">Orders:</span> +8%
              </p>
              <p>
                <span className="font-semibold">New Buyers:</span> +5%
              </p>
            </div>
          </div>

          {/* Market Insights */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-medium mb-2">🌍 Market Insights</h2>
            <ul className="space-y-2 text-gray-700">
              <li>📈 Tomatoes trending in nearby city markets</li>
              <li>🥗 Onions in demand for festive recipes</li>
              <li>🚚 Retailer demand for bulk Potatoes increasing</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
