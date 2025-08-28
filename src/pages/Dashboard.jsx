import Sidebar1 from "../farmerUi/own-sidebar";

export default function Dashboard() {
  return (
    <div>
      {/* Sidebar stays fixed or absolute */}
      <div className="fixed top-0 left-0 h-full w-64">
        <Sidebar1 />
      </div>

      {/* Main content */}

    </div>
  );
}
