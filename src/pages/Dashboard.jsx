// import Sidebar1 from "../farmerUi/own-sidebar";

// export default function Dashboard() {
//   return (
//     <div>
//       {/* Sidebar stays fixed or absolute */}
//       <div className="fixed top-0 left-0 h-full w-64">
//         <Sidebar1 />
//       </div>

//       {/* Main content */}

//     </div>
//   );
// }

import Sidebar1 from "../farmerUi/own-sidebar";
import BannerCarousel from "../farmerUi/BannerCarousel";
import DashboardHeader from "../farmerUi/DashboardHeader";
import WeatherCard from "../farmerUi/WeatherCard";
import RevenueCard from "../farmerUi/RevenueCard";
import ListingToggle from "../farmerUi/ListingToggle";
import { useNavigate } from "react-router-dom";

const user = { name: "Albert" };
const weather = { city: "Chicago", temp: 24, high: 27, low: 10, desc: "Cloudy" };
const revenue = 50000, growth = 12.45;

const trending = [
  { id: 1, name: "Wheat Grain", revenue: 18000, sold: 150 },
  { id: 2, name: "Organic Tomato", revenue: 13500, sold: 220 },
  { id: 3, name: "Fresh Spinach", revenue: 9100, sold: 160 },
  { id: 4, name: "Golden Corn", revenue: 15800, sold: 175 },
  { id: 5, name: "Brown Rice", revenue: 12000, sold: 110 },
];

const listed = [
  { id: 6, name: "Red Chilli Pepper", revenue: 8200, sold: 80 },
  { id: 7, name: "Soybean", revenue: 9400, sold: 130 },
  { id: 8, name: "Cucumber", revenue: 4700, sold: 90 },
  { id: 9, name: "Sugarcane", revenue: 10400, sold: 60 },
  { id: 10, name: "Sesame", revenue: 6100, sold: 45 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed sidebar sits on top of the document flow */}
      <Sidebar1 />

      {/* Main area reserves space for sidebar on lg+ */}
      <main className="pl-0 lg:pl-72 w-full">
        <div className="px-4 md:px-8 py-6 w-full">
          <DashboardHeader user={user} />
          {/* Make sure the banner stretches full width */}
          <div className="w-full">
            <BannerCarousel />
          </div>

          {/* Two-column responsive grid that uses the whole row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">
            {/* Left column */}
            <section className="w-full">
              <WeatherCard city={weather.city} forecast={weather} />
              <RevenueCard revenue={`$${revenue.toLocaleString()}`} growth={growth} />
            </section>

            {/* Right column */}
            <aside className="w-full">
              <ListingToggle
                trending={trending}
                listed={listed}
                onAddEditClick={() => navigate("/post")}
              />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
