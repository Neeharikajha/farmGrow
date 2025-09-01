import React from "react";
import Sidebar1 from "../farmerUi/own-sidebar";
import DashboardHeader from "../farmerUi/DashboardHeader";
import ParentCardTransaction from "../farmerUi/ParentCardTransaction";
import RevenueLineChart from "../farmerUi/RevenueLineChart";
import SalesByLocation from "../farmerUi/SalesByLocation";
import TopSellingProducts from "../farmerUi/TopSellingProducts";

const user = { name: "Albert" };

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 w-full flex">
      <Sidebar1 />
      <main className="flex-1 pl-0 lg:pl-72 w-full">
        <div className="px-4 md:px-8 py-6 w-full">
          <DashboardHeader user={user} />
          <div className="mt-6 w-full">
            <ParentCardTransaction />
          </div>
          <div className="mt-6 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 w-full">
              <RevenueLineChart className="w-full" />
            </div>
            <div className="lg:col-span-1 w-full">
              <SalesByLocation className="w-full" />
            </div>
          </div>
          <div className="mt-6 w-full">
            <TopSellingProducts className="w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
