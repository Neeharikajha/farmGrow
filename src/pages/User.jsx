import React, { useMemo, useState } from "react";
import Navbar from "../webpage/Navbar";
import CartItems from "../webpage/CartItems";

import HeroCarousel from "../userUi/HeroCarousel";
import CategoryBar from "../userUi/CategoryBar";
import FiltersSidebar from "../userUi/FiltersSidebar";
import VegGrid from "../userUi//VegGrid";

const RAW_VEG = [
  { id: 1, name: "Tomato (Hybrid)",     pricePerKg: 24, image: "https://plus.unsplash.com/premium_photo-1661833100239-de8f260b6f8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvJTIwcGxhbnR8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000", category: "Fruit",  isOrganic: false, rating: 4.1 },
  { id: 2, name: "Potato",              pricePerKg: 22, image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=600", category: "Root",   isOrganic: true,  rating: 4.4 },
  { id: 3, name: "Carrot",              pricePerKg: 28, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fycm90fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000", category: "Root",   isOrganic: false, rating: 4.0 },
  { id: 4, name: "Cabbage",             pricePerKg: 18, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3DWDEyoFSa0BnLiXHCjnUT3H8jyLp6OjlMA&s", category: "Leafy", isOrganic: true,  rating: 3.9 },
  { id: 5, name: "Onion (Red)",         pricePerKg: 26, image: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b25pb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", category: "Bulb",  isOrganic: false, rating: 4.2 },
  { id: 6, name: "Green Peas",          pricePerKg: 64, image: "https://plus.unsplash.com/premium_photo-1663844169236-ff32474d1dc8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVhc3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000", category: "Legume", isOrganic: true,  rating: 4.6 },
  { id: 7, name: "Bottle Gourd",        pricePerKg: 30, image: "data:image/jpeg;base64,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", category: "Gourd", isOrganic: false, rating: 3.8 },
  { id: 8, name: "Coriander (Dhaniya)", pricePerKg: 12, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCuu6Kw-Unib6-bWGdP7DIztGr_NC_3Mf5XA&s", category: "Herb",  isOrganic: true,  rating: 4.5 },
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
