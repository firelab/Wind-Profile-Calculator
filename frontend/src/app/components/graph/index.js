import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './index.css'; // Import CSS for styling

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph({ data }) {
  // If no data is provided, return null
  if (!data || !data.heights || !data.wind_speeds) {
    return <p>No data available</p>;
  }

  // Extract values for plotting
  const heights = data.heights;
  const windSpeeds = data.wind_speeds;
  const inputWindSpeed = data.input_wind_speed;
  const inputReferenceHeight = data.input_reference_height;
  const outputWindSpeed = data.output_wind_speed;
  const desiredOutputHeight = data.desired_output_height;

  // Prepare chart data
  const chartData = {
    labels: windSpeeds, // X-axis labels (wind speeds)
    datasets: [
      {
        label: 'Input Point',
        data: [{ x: inputWindSpeed, y: inputReferenceHeight }],
        backgroundColor: 'rgb(255, 99, 132)', // Color for input point
        borderColor: 'rgb(255, 99, 132)', // Color for input point
        pointRadius: 10, // Size of the input point
        pointBorderWidth: 3,
        pointStyle: 'star', // Change to star
        zIndex: 2, // Ensure points are on top
      },
      {
        label: 'Output Point',
        data: [{ x: outputWindSpeed, y: desiredOutputHeight }],
        backgroundColor: 'rgb(54, 162, 235)', // Color for output point
        borderColor: 'rgb(54, 162, 235)', // Color for output point
        pointRadius: 10, // Size of the output point
        pointBorderWidth: 3,
        pointStyle: 'star', // Change to star
        zIndex: 2, // Ensure points are on top
      },
      {
        label: 'Height (m)',
        data: heights.map((height, index) => ({ x: windSpeeds[index], y: height })), // Mapping heights to x, y objects
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 0, // Hide points on the line
      },
    ],
  };

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
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Wind Speed Profile</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
