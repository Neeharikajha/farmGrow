import Sidebar1 from "../webpage/own-sidebar"; // adjust the path

function Farmer() {
  return (
    <div className="flex h-screen">
      <Sidebar1 />
      <div className="flex-1 p-6">
        {/* Main content */}
      </div>
    </div>
  );
}

export default Farmer;

