import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import OptionValue from "@/components/OptionValue";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Home() {
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/global")
      .then((res) => {
        const dominance = res.data.data.market_cap_percentage;

        const topCoins = Object.entries(dominance)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        setLabels(topCoins.map(([coin]) => coin.toUpperCase()));
        setSeries(topCoins.map(([, value]) => parseFloat(value.toFixed(2))));
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  console.log("Labels:", labels);
  console.log("Series:", series);
  const optionsData = [
    { id: '001', name: 'Apple' },
    { id: '002', name: 'Banana' },
    { id: '003', name: 'Cherry' },
    { id: '004', name: 'Date' },
    { id: '005', name: 'Elderberry' },
    { id: '006', name: 'Banana' },
  ];

  const handleSelect = (selectedOption) => {
    console.log('Selected:', selectedOption);
  };

  const preselectedValue = { id: '003', name: 'Cherry' }; // Optional

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900 drop-shadow-md">
        Crypto Market Dominance
      </h1>

      <OptionValue
        options={optionsData}
        onSelect={handleSelect}
        valueFromServer={preselectedValue}
        valueKey="id"
        labelKey="name"
      />

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        {typeof window !== "undefined" && series.length > 0 ? (
          <Chart
            type="pie"
            series={series}
            options={{
              labels,
              title: {
                text: "Top 5 Crypto Market Share",
                style: { fontSize: "20px", fontWeight: "bold", color: "#374151" },
              },
              legend: {
                position: "bottom",
                labels: { colors: "#4B5563", fontSize: "14px" },
              },
              dataLabels: {
                style: {
                  colors: ["#1F2937"],
                  fontWeight: "600",
                },
                formatter: (val) => val + "%",
              },
              tooltip: {
                y: {
                  formatter: (val) => val + "%",
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: { width: 300 },
                    legend: { position: "bottom" },
                  },
                },
              ],
            }}
            width="400"
          />
        ) : (
          <p className="text-center text-gray-700">Loading chart data...</p>
        )}
      </div>
    </div>
  );
}
