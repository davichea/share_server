import dynamic from 'next/dynamic';
import React, { useState, useRef, useEffect } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ✅ OrgChart Component
function OrgChart() {
  // State to track open/closed nodes
  const [openNodes, setOpenNodes] = useState({
    CTO: true,
    CFO: true,
  });

  const toggleNode = (node) => {
    setOpenNodes((prev) => ({
      ...prev,
      [node]: !prev[node],
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-medium mb-4">Organization Chart</h3>
      <div className="flex flex-col items-center text-sm">
        {/* CEO */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded font-semibold cursor-default select-none">
          CEO
        </div>

        {/* Line */}
        <div className="w-1 h-6 bg-gray-300"></div>

        {/* CTO & CFO Level */}
        <div className="flex gap-16 justify-center items-start mt-2 w-full max-w-md">

          {/* CTO Branch */}
          <div className="flex flex-col items-center w-1/2">
            <div
              className="bg-blue-400 text-white px-4 py-2 rounded cursor-pointer select-none flex items-center justify-center gap-2"
              onClick={() => toggleNode('CTO')}
              aria-expanded={openNodes.CTO}
            >
              CTO
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${openNodes.CTO ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="w-1 bg-gray-300" style={{ height: openNodes.CTO ? '1rem' : 0, transition: 'height 0.3s' }}></div>

            {/* Children */}
            {openNodes.CTO && (
              <div className="flex gap-3 mt-1">
                <div className="bg-blue-200 px-3 py-1 rounded text-gray-800 cursor-default select-none">Dev 1</div>
                <div className="bg-blue-200 px-3 py-1 rounded text-gray-800 cursor-default select-none">Dev 2</div>
              </div>
            )}
          </div>

          {/* CFO Branch */}
          <div className="flex flex-col items-center w-1/2">
            <div
              className="bg-green-400 text-white px-4 py-2 rounded cursor-pointer select-none flex items-center justify-center gap-2"
              onClick={() => toggleNode('CFO')}
              aria-expanded={openNodes.CFO}
            >
              CFO
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${openNodes.CFO ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="w-1 bg-gray-300" style={{ height: openNodes.CFO ? '1rem' : 0, transition: 'height 0.3s' }}></div>

            {/* Children */}
            {openNodes.CFO && (
              <div className="flex gap-3 mt-1">
                <div className="bg-green-200 px-3 py-1 rounded text-gray-800 cursor-default select-none">Acct 1</div>
                <div className="bg-green-200 px-3 py-1 rounded text-gray-800 cursor-default select-none">Acct 2</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Main Dashboard Component
export default function Dashboard() {
  const filterOptions = ['Year', 'Month', 'Week'];
  const [selectedFilter, setSelectedFilter] = useState('Year');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const chartData = {
    Year: {
      series: [120, 200, 150],
      labels: ['Product A', 'Product B', 'Product C'],
      trend: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [100, 120, 130, 170, 190, 220]
      }
    },
    Month: {
      series: [30, 70, 50],
      labels: ['Product A', 'Product B', 'Product C'],
      trend: {
        months: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        values: [25, 45, 60, 70]
      }
    },
    Week: {
      series: [10, 25, 15],
      labels: ['Product A', 'Product B', 'Product C'],
      trend: {
        months: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [5, 10, 12, 9, 14, 18, 20]
      }
    }
  };

  const donutOptions = {
    chart: { type: 'donut' },
    labels: chartData[selectedFilter].labels,
    dataLabels: { enabled: true },
    legend: { position: 'bottom' },
    responsive: [{
      breakpoint: 640,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }]
  };

  const barOptions = {
    chart: { type: 'bar' },
    xaxis: { categories: chartData[selectedFilter].labels },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        distributed: true
      }
    },
    colors: ['#60A5FA', '#34D399', '#FBBF24'],
    legend: { show: false }
  };

  const lineOptions = {
    chart: { type: 'line' },
    xaxis: { categories: chartData[selectedFilter].trend.months },
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    colors: ['#6366F1']
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Sales Dashboard</h2>

      {/* Custom Dropdown */}
      <div className="mb-6 relative w-52" ref={dropdownRef}>
        <div
          className="border border-gray-300 rounded-lg shadow-sm px-4 py-2 cursor-pointer flex justify-between items-center bg-white text-sm"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>{selectedFilter}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg text-sm">
            {filterOptions.map(option => (
              <div
                key={option}
                onClick={() => {
                  setSelectedFilter(option);
                  setDropdownOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedFilter === option ? 'bg-blue-50 font-medium' : ''}`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Sales Distribution</h3>
          <ReactApexChart
            options={donutOptions}
            series={chartData[selectedFilter].series}
            type="donut"
            height={350}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Sales Comparison</h3>
          <ReactApexChart
            options={barOptions}
            series={[
              {
                name: 'Sales',
                data: chartData[selectedFilter].series
              }
            ]}
            type="bar"
            height={350}
          />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Sales Trend</h3>
        <ReactApexChart
          options={lineOptions}
          series={[
            {
              name: 'Sales Over Time',
              data: chartData[selectedFilter].trend.values
            }
          ]}
          type="line"
          height={350}
        />
      </div>

      {/* Organizational Chart */}
      <OrgChart />
    </div>
  );
}
