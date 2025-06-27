import { useState } from 'react';

const appList = [
  { id: 'app1', name: 'App One' },
  { id: 'app2', name: 'App Two' },
];

const fields = ['username', 'email'];

export default function App() {
  const [activeTab, setActiveTab] = useState('app1');
  const [formData, setFormData] = useState({});

  const handleChange = (appId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = appList.map((app) => ({
      appId: app.id,
      ...formData[app.id],
    }));
    console.log(result);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex mb-4 border-b">
        {appList.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveTab(app.id)}
            className={`px-4 py-2 ${
              activeTab === app.id
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            {app.name}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={formData[activeTab]?.[field] || ''}
            onChange={(e) => handleChange(activeTab, field, e.target.value)}
            className="w-full border rounded p-2"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit All
        </button>
      </form>
    </div>
  );
}
