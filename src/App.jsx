import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar"; // <-- adjust path as needed
import Farmer from "./pages/Farmer";
import User from "./pages/User";
import Hero from "./webpage/Hero";

import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import Chat from "./pages/Chat";
import Transaction from "./pages/Transaction";
import Analytics from "./pages/Analytics";
import CropCalendar from "./pages/CropCalendar";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/farmer" element={<Farmer />} />
          <Route path="/user" element={<User />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/crop-calendar" element={<CropCalendar />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;

