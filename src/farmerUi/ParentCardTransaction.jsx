import React from "react";
import SingleCardTransaction from "./SingleCardTransaction";

function ParentCardTransaction() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <SingleCardTransaction
        title="Total Order"
        value="₹23,251"
        subtitle="Increase 10 this month"
        highlight="↑ 10%"
        highlightColor="bg-green-100 text-green-700"
      />
      <SingleCardTransaction
        title="Total Cost"
        value="₹45,130"
        subtitle="Vs last 7 days"
        highlight="↓ 5%"
        highlightColor="bg-red-100 text-red-700"
      />
      <SingleCardTransaction
        title="Success"
        value="₹22,211"
        subtitle="Vs last month"
        highlight="↑ 8%"
        highlightColor="bg-green-100 text-green-700"
      />
      <SingleCardTransaction
        title="Cancel"
        value="11"
        subtitle="Increase 10 this month"
        highlight="↑ 2%"
        highlightColor="bg-yellow-100 text-yellow-700"
      />
    </div>
  );
}

export default ParentCardTransaction;
