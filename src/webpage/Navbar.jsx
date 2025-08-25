import React, { useState } from "react";
import { Search, Heart, User, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = ({ cartCount = 0, toggleCart }) => {
  const [open, setOpen] = useState(false);

  const linkClass =
    "hover:text-green-600 cursor-pointer text-[16px]"; // increased by 2px from 14px

  const iconClass = "text-gray-700 hover:text-green-600";

  return (
    <header className="border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-green-600">
              <span className="text-white text-[18px] font-bold">🌿</span>
            </span>
            <span className="text-[18px] font-semibold">FarmGrow</span>
          </div>

          {/* Center: Links (desktop) */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700">
            <li className={linkClass}>Home</li>
            <li className={linkClass}>Flash Sale</li>
            <li className={linkClass}>Shop</li>
            <li className={linkClass}>Blog</li>
            <li className={linkClass}>Contact</li>
          </ul>

          {/* Right: Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Search className={iconClass} size={20} />
            <Heart className={iconClass} size={20} />
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

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-3 text-gray-700">
              <li className={linkClass}>Home</li>
              <li className={linkClass}>Flash Sale</li>
              <li className={linkClass}>Shop</li>
              <li className={linkClass}>Blog</li>
              <li className={linkClass}>Contact</li>
            </ul>
            <div className="mt-4 flex items-center gap-4">
              <Search className={iconClass} size={20} />
              <Heart className={iconClass} size={20} />
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
