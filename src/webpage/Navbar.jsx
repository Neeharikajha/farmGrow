// import React, { useState } from "react";
// import { Search, Heart, User, ShoppingCart, Menu, X, Upload } from "lucide-react";

// const Navbar = ({ cartCount = 0, toggleCart }) => {
//   const [open, setOpen] = useState(false);

//   const links = ["Home", "Buy", "Trending", "SnapFind"]; // new one-word for upload & find
//   const linkClass =
//     "hover:text-green-600 cursor-pointer text-[16px] font-medium transition-colors duration-200";

//   const iconClass = "text-gray-700 hover:text-green-600 transition-colors duration-200";

//   return (
//     <header className="border-b bg-white shadow-sm">
//       <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-600">
//               <span className="text-white text-[18px] font-bold">🌿</span>
//             </span>
//             <span className="text-[18px] font-semibold text-gray-900">FarmGrow</span>
//           </div>

//           {/* Desktop Links */}
//           <ul className="hidden md:flex items-center gap-8 text-gray-700">
//             {links.map((link) => (
//               <li key={link} className={linkClass}>
//                 {link}
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Icons */}
//           <div className="hidden md:flex items-center gap-4">
//             <Search className={iconClass} size={20} />
//             <User className={iconClass} size={20} />
//             <button
//               aria-label="Cart"
//               className="relative"
//               onClick={toggleCart}
//             >
//               <ShoppingCart className={iconClass} size={20} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//             onClick={() => setOpen(!open)}
//             aria-label="Toggle menu"
//           >
//             {open ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {open && (
//           <div className="md:hidden pb-4 mt-2 border-t border-gray-200">
//             <ul className="flex flex-col gap-3 text-gray-700">
//               {links.map((link) => (
//                 <li key={link} className={linkClass}>
//                   {link}
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-4 flex items-center gap-4">
//               <Search className={iconClass} size={20} />
//               <User className={iconClass} size={20} />
//               <button
//                 aria-label="Cart"
//                 className="relative"
//                 onClick={toggleCart}
//               >
//                 <ShoppingCart className={iconClass} size={20} />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cartCount = 0, toggleCart }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/user" },
    { name: "Buy", path: "/user/buy" },
    { name: "Trending", path: "/user/trending" },
    { name: "SnapFind", path: "/user/snapfind" },
  ];

  const linkClass =
    "hover:text-green-600 cursor-pointer text-[16px] font-medium transition-colors duration-200";

  const iconClass =
    "text-gray-700 hover:text-green-600 transition-colors duration-200";

  return (
    <header className="border-b bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-600">
              <span className="text-white text-[18px] font-bold">🌿</span>
            </span>
            <span className="text-[18px] font-semibold text-gray-900">
              FarmGrow
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700">
            {links.map((link) => (
              <li key={link.name} className={linkClass}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Search className={iconClass} size={20} />
            <User className={iconClass} size={20} />
            <button aria-label="Cart" className="relative" onClick={toggleCart}>
              <ShoppingCart className={iconClass} size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 mt-2 border-t border-gray-200">
            <ul className="flex flex-col gap-3 text-gray-700">
              {links.map((link) => (
                <li key={link.name} className={linkClass}>
                  <Link to={link.path} onClick={() => setOpen(false)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-4">
              <Search className={iconClass} size={20} />
              <User className={iconClass} size={20} />
              <button
                aria-label="Cart"
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingCart className={iconClass} size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
