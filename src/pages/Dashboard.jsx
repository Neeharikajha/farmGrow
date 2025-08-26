export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Total Sales</h2>
          <p className="text-2xl font-bold">₹ 1,20,000</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Total Produce Sold</h2>
          <p className="text-2xl font-bold">1,450 kg</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Current Listed Items</h2>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-sm text-gray-500">Pending Offers</h2>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>

      {/* Notifications + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="bg-white p-4 rounded-2xl shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">🔔 Notifications</h2>
          <ul className="space-y-2 text-gray-700">
            <li>📩 New order received from Retailer A</li>
            <li>💬 Message from Buyer B</li>
            <li>⚡ Bid placed on your wheat listing</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>
          <div className="flex flex-col space-y-3">
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              ➕ Add New Product
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              📊 View Analytics
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
              📅 Check Crop Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
