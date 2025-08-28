// SingleCardTransaction.jsx
import React from 'react';

function SingleCardTransaction({ title, value, subtitle, highlight, highlightColor }) {
  return (
    <div className='bg-white rounded-lg shadow p-5'>
        <div className='text-gray-500 text-sm font-medium'>{title}</div>
        <div className='mt-4'>
            <div className='text-black text-2xl font-semibold'>{value}</div>
            <div className="text-xs text-gray-400">{subtitle}</div>
        </div>
    </div>
  );
}

export default SingleCardTransaction;
