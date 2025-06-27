import React from 'react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
            className="w-28 h-28 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
          <p className="text-gray-500">Frontend Developer</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Profile Info</h3>
          <ul className="text-gray-600 space-y-1">
            <li><strong>Email:</strong> john.doe@example.com</li>
            <li><strong>Location:</strong> New York, USA</li>
            <li><strong>Joined:</strong> Jan 2023</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
