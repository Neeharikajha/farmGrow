// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiHome,
//   FiFileText,
//   FiMessageCircle,
//   FiCreditCard,
//   FiBarChart2,
//   FiCalendar,
//   FiChevronUp,
//   FiChevronRight,
// } from "react-icons/fi";

// // ✅ Match labels with route paths
// const MAIN_MENU = [
//   { label: "Dashboard", icon: FiHome, path: "/dashboard" },
//   { label: "Post", icon: FiFileText, path: "/post" },
//   { label: "Chat", icon: FiMessageCircle, path: "/chat" },
//   { label: "Transaction", icon: FiCreditCard, path: "/transaction" },
//   { label: "Analytics", icon: FiBarChart2, path: "/analytics" },
//   { label: "Crop Calendar", icon: FiCalendar, path: "/crop-calendar" },
// ];

// export default function Sidebar() {
//   const [menuOpen] = useState(true);
//   const location = useLocation(); 

//   return (
//     <aside className="bg-white border-r w-72 flex flex-col h-screen">
//       <div className="flex items-center gap-3 px-6 py-4 border-b">
//         <div className="bg-black text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">
//           <span>F</span>
//         </div>
//         <div>
//           <div className="font-semibold">FarmGrow</div>
//           <div className="text-xs text-gray-400">Enterprise</div>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-2 py-4">
//         <div className="mb-3">
//           {MAIN_MENU.map((item) => {
//             const isActive = location.pathname === item.path; 
//             return (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
//                   isActive ? "bg-gray-200 font-semibold" : ""
//                 }`}
//               >
//                 <item.icon className="h-4 w-4" />
//                 <span>{item.label}</span>
//                 {item.label === "Dashboard" && (
//                   <FiChevronRight className="ml-auto h-3 w-3 text-gray-400" />
//                 )}
//               </Link>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Support & User Account */}
//       <div className="p-3 border-t mt-auto">
//         <div className="flex items-center gap-3 mb-4">
//           <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm px-2">
//             <FiMessageCircle className="h-4 w-4" />
//             Feedback
//           </button>
//         </div>
//         <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
//           <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center font-semibold">
//             CN
//           </div>
//           <div className="flex-1">
//             <div className="text-sm font-semibold">shadcn</div>
//             <div className="text-xs text-gray-400">m@example.com</div>
//           </div>
//           <FiChevronUp className="h-4 w-4 text-gray-400" />
//         </div>
//       </div>
//     </aside>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiFileText,
  FiMessageCircle,
  FiCreditCard,
  FiBarChart2,
  FiCalendar,
  FiChevronUp,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

// ✅ Match labels with route paths
const MAIN_MENU = [
  { label: "Dashboard", icon: FiHome, path: "/dashboard" },
  { label: "Post", icon: FiFileText, path: "/post" },
  { label: "Chat", icon: FiMessageCircle, path: "/chat" },
  { label: "Transaction", icon: FiCreditCard, path: "/transaction" },
  { label: "Analytics", icon: FiBarChart2, path: "/analytics" },
  { label: "Crop Calendar", icon: FiCalendar, path: "/crop-calendar" },
];

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* 📱 Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-md shadow"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r w-72 flex flex-col h-screen fixed top-0 left-0 z-40 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <div className="bg-black text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">
            <span>F</span>
          </div>
          <div>
            <div className="font-semibold">FarmGrow</div>
            <div className="text-xs text-gray-400">Enterprise</div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <div className="mb-3">
            {MAIN_MENU.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                    isActive ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)} // close on mobile nav
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.label === "Dashboard" && (
                    <FiChevronRight className="ml-auto h-3 w-3 text-gray-400" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Support & User Account */}
        <div className="p-3 border-t mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm px-2">
              <FiMessageCircle className="h-4 w-4" />
              Feedback
            </button>
          </div>
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center font-semibold">
              CN
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">shadcn</div>
              <div className="text-xs text-gray-400">m@example.com</div>
            </div>
            <FiChevronUp className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
