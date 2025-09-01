import React, { useMemo, useState } from "react";
import Navbar from "../webpage/Navbar";
import CartItems from "../webpage/CartItems";

import HeroCarousel from "../userUi/HeroCarousel";
import CategoryBar from "../userUi/CategoryBar";
import FiltersSidebar from "../userUi/FiltersSidebar";
import VegGrid from "../userUi//VegGrid";

const RAW_VEG = [
  { id: 1, name: "Tomato (Hybrid)",     pricePerKg: 24, image: "https://images.unsplash.com/photo-1546471180-4b6e1c9a7f0c?q=80&w=600", category: "Fruit",  isOrganic: false, rating: 4.1 },
  { id: 2, name: "Potato",              pricePerKg: 22, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600", category: "Root",   isOrganic: true,  rating: 4.4 },
  { id: 3, name: "Carrot",              pricePerKg: 28, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600", category: "Root",   isOrganic: false, rating: 4.0 },
  { id: 4, name: "Cabbage",             pricePerKg: 18, image: "https://images.unsplash.com/photo-1615486363870-5ed9934f7a32?q=80&w=600", category: "Leafy", isOrganic: true,  rating: 3.9 },
  { id: 5, name: "Onion (Red)",         pricePerKg: 26, image: "https://images.unsplash.com/photo-1587049352851-8f4e1a40add8?q=80&w=600", category: "Bulb",  isOrganic: false, rating: 4.2 },
  { id: 6, name: "Green Peas",          pricePerKg: 64, image: "https://images.unsplash.com/photo-1601000938259-9d5461bffe2e?q=80&w=600", category: "Legume", isOrganic: true,  rating: 4.6 },
  { id: 7, name: "Bottle Gourd",        pricePerKg: 30, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600", category: "Gourd", isOrganic: false, rating: 3.8 },
  { id: 8, name: "Coriander (Dhaniya)", pricePerKg: 12, image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600", category: "Herb",  isOrganic: true,  rating: 4.5 },
];

export default function UserShop() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [category, setCategory] = useState("All");
  const [filters, setFilters] = useState({
    category: "All",
    organic: "Any",
    min: "",
    max: "",
    rating: 0,
    colors: [],
  });

  const addToCart = (veg) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === veg.id);
      if (found) return prev.map((i) => (i.id === veg.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...veg, qty: 1, price: veg.pricePerKg }];
    });
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const toggleCart = () => setShowCart((v) => !v);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const categories = useMemo(
    () => Array.from(new Set(RAW_VEG.map((v) => v.category))),
    []
  );

  const filtered = useMemo(() => {
    const min = parseFloat(filters.min);
    const max = parseFloat(filters.max);
    return RAW_VEG.filter((v) => {
      const catOk =
        (category === "All" || v.category === category) &&
        (filters.category === "All" || v.category === filters.category);
      const orgOk =
        filters.organic === "Any" ? true : filters.organic === "Yes" ? v.isOrganic : !v.isOrganic;
      const priceOk =
        (isNaN(min) ? true : v.pricePerKg >= min) &&
        (isNaN(max) ? true : v.pricePerKg <= max);
      const ratingOk = v.rating >= (filters.rating || 0);
      return catOk && orgOk && priceOk && ratingOk;
    });
  }, [category, filters]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.qty, 0)}
        toggleCart={toggleCart}
      />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 flex-1">
        {/* Hero */}
        <HeroCarousel />

        {/* Category chips */}
        <div className="mt-6">
          <CategoryBar
            categories={["All", ...categories]}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        {/* Main: sidebar + grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters */}
          <div className="lg:col-span-3">
            <FiltersSidebar
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />
          </div>

          {/* Products grid */}
          <div className="lg:col-span-9">
            <VegGrid items={filtered} onAdd={addToCart} />
          </div>
        </div>
      </div>

      {showCart && (
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-8">
          <CartItems cart={cart} removeFromCart={removeFromCart} total={total} />
        </div>
      )}
    </div>
  );
}
