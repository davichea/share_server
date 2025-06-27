import React from 'react';

export default function App_Four() {
  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-gray-50 rounded-lg shadow-md text-gray-800 font-sans">
      <header className="text-center border-b-4 border-blue-600 pb-4 mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to App Four</h1>
        <p className="text-lg text-gray-600">Your awesome React app page</p>
      </header>

      <main className="flex flex-col md:flex-row gap-8 justify-center">
        <section className="bg-white p-6 rounded-md shadow-sm flex-1">
          <h2 className="text-2xl font-semibold mb-3">About This App</h2>
          <p>This is a simple React component styled with Tailwind CSS.</p>
        </section>

        <section className="bg-white p-6 rounded-md shadow-sm flex-1">
          <h2 className="text-2xl font-semibold mb-3">Features</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Clean and minimal design</li>
            <li>Responsive layout</li>
            <li>Easy to customize</li>
          </ul>
        </section>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        © 2025 Your Company
      </footer>
    </div>
  );
}
