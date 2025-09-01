import Sidebar1 from "../farmerUi/own-sidebar";
import ParentCardTransaction from "../farmerUi/ParentCardTransaction";
import { TransactionTable } from "../farmerUi/TransactionTable";
import SearchDate from "../farmerUi/searchDate";
import DashboardHeader from "../farmerUi/DashboardHeader";

const user = { name: "Albert" };

export default function Transaction() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Sidebar1 />
      <main className="pl-0 lg:pl-72 w-full">
        <div className="px-4 md:px-8 py-6 w-full">
          <DashboardHeader user={user} />
          <div className="mt-6 w-full">
            <ParentCardTransaction />
          </div>
          <div className="mt-6 w-full">
            <SearchDate />
          </div>
          <div className="mt-8 w-full">
            <TransactionTable />
          </div>
        </div>
      </main>
    </div>
  );
}


