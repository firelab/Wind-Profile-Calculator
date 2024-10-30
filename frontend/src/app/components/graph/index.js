import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './index.css'; // Import CSS for styling

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph({ data }) {
  // Log the incoming data for debugging
  console.log("Graph Data Received:", data);
  
  // If no data is provided, return a message
  if (!data || !data.heights || !data.windSpeeds) {
    console.warn("No data available for graph.");
    return <p>No data available</p>;
  }

  // Extract values for plotting
  const heights = data.heights; // Y-axis data
  const windSpeeds = data.windSpeeds; // X-axis data

  // Log the heights and wind speeds before preparing chart data
  console.log("Heights:", heights);
  console.log("Wind Speeds:", windSpeeds);

  // Prepare chart data
  const chartData = {
    labels: windSpeeds, // X-axis labels (wind speeds)
    datasets: [
      {
        label: 'Height vs Wind Speed',
        data: heights.map((height, index) => ({ x: windSpeeds[index], y: height })), // Mapping heights to x, y objects
        fill: false,
        borderColor: 'rgb(75, 192, 192)', // Line color
        tension: 0.1,
        pointRadius: 2, // Size of points on the line
      },
    ],
  };

  // Log the chart data before rendering
  console.log("Chart Data Prepared:", chartData);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Wind Speed (m/s)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Height (m)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Height: ${tooltipItem.raw.y} m, Wind Speed: ${tooltipItem.raw.x} m/s`;
          },
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <Line data={chartData} options={options} />
    </div>
  );
}
