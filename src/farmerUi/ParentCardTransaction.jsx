// ParentCardTransaction.jsx
import React from 'react';
import SingleCardTransaction from './SingleCardTransaction';

function ParentCardTransaction() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <SingleCardTransaction
        title="Total Order"
        value="₹23,251"
        // highlight="↑ 10%"
        // highlightColor="text-green-600"
        subtitle="Increase 10 this month"
      />
      <SingleCardTransaction
        title="Total Cost"
        value="₹45,130"
        subtitle="Vs last 7 days"
      />
      <SingleCardTransaction
        title="Success"
        value="₹22,211"
        subtitle="Vs last month"
      />
      <SingleCardTransaction
        title="Cancel"
        value="11"
        subtitle="Increase 10 this month"
      />
    </div>
  );
}

export default ParentCardTransaction;
