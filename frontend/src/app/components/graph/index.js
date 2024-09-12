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
        label: 'Height (m)',
        data: heights, // Y-axis data (heights)
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Input Wind Speed',
        data: windSpeeds.map(speed => (speed === inputWindSpeed ? inputReferenceHeight : NaN)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 5,
        pointStyle: 'rect',
      },
      {
        label: 'Desired Output',
        data: windSpeeds.map(speed => (speed === outputWindSpeed ? desiredOutputHeight : NaN)),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        pointRadius: 5,
        pointStyle: 'circle',
      }
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