
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar"; 

import SignUp from "./pages/Signup";

// Farmer pages
import Farmer from "./pages/Farmer";
import User from "./pages/User";
import Hero from "./webpage/Hero";

import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Chat from "./pages/Chat";
import Transaction from "./pages/Transaction";
import Analytics from "./pages/Analytics";
import CropCalendar from "./pages/CropCalendar";

// User pages
import UserShop from "./pages/BuyPage";       // Buy page
import Trending from "./pages/Trending";       // Trending page
import SnapFind from "./pages/SnapFind";       // Upload & find page
import CartPage from "./pages/CartPage";       // Cart page

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Hero />} />
           <Route path="/SignUp" element={<SignUp />} />
          
          {/* Farmer & default User page */}
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/user" element={<User />} />

          {/* User routes */}
          <Route path="/user/home" element={<Hero />} />
          <Route path="/user/buy" element={<UserShop />} />
          <Route path="/user/trending" element={<Trending />} />
          <Route path="/user/snapfind" element={<SnapFind />} />
          <Route path="/user/cart" element={<CartPage />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/crop-calendar" element={<CropCalendar />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
