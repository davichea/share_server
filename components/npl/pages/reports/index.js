import React from 'react';

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Report Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b">
              <td className="px-6 py-4">2025-05-31</td>
              <td className="px-6 py-4">Monthly Sales</td>
              <td className="px-6 py-4 text-green-600 font-medium">Completed</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4">2025-05-30</td>
              <td className="px-6 py-4">User Activity</td>
              <td className="px-6 py-4 text-yellow-600 font-medium">Pending</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
