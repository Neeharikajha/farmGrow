// DashboardHeader.jsx
import { FiBell, FiSearch } from "react-icons/fi";
export default function DashboardHeader({ user }) {
  return (
    <div className="flex items-center justify-between mb-6 px-4">
      <div className="flex items-center gap-2">
        <FiSearch className="ml-1 text-gray-400" />
        <input
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring w-64"
          type="text" placeholder="Search anything here..." />
      </div>
      <div className="flex items-center gap-2">
        <FiBell className="text-gray-500 h-6 w-6 cursor-pointer" />
        <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center font-semibold text-sm text-gray-600">
          {user.name}
        </div>
      </div>
    </div>
  );
}
