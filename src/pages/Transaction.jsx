import Sidebar1 from "../farmerUi/own-sidebar";
import ParentCardTransaction from "../farmerUi/ParentCardTransaction";
import { TransactionTable } from "../farmerUi/TransactionTable";

import SearchDate from "../farmerUi/searchDate";


export default function Transaction() {
  return (
    <div className="flex min-h-screen">
      <Sidebar1 />
      {/* 🔹 Removed right padding, kept only left/top/bottom */}
      <div className="flex-1 pl-6 pr-0 pt-8 pb-8">
        <div className="w-full">
          <ParentCardTransaction />
        </div>
        <div className="mt-6">
          <SearchDate/>
        </div>
        <div className="mt-8 w-full">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}

