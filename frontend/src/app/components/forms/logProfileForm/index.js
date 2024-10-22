import React, { useState } from 'react';
import InputField from '../../inputField/index.js';
import Button from '../../button/index.js';
import Graph from '../../graph/index.js'; // Import the Graph component
import './index.css'; // Import the CSS file for styling

export default function LogProfileForm() {
  const [z0, setZ0] = useState('0.43');
  const [inputWindSpeed, setInputWindSpeed] = useState('4');
  const [inputReferenceHeight, setInputReferenceHeight] = useState('10');
  const [desiredOutputHeight, setDesiredOutputHeight] = useState('6.096');
  const [graphData, setGraphData] = useState(null); // State for graph data

  const handleGenerateClick = async () => {
    // Convert string values to numbers
    const payload = {
      z0: parseFloat(z0) || 0, // Ensure non-zero default for z0
      input_wind_speed: parseFloat(inputWindSpeed) || 0,
      input_reference_height: parseFloat(inputReferenceHeight) || 0,
      desired_output_height: parseFloat(desiredOutputHeight) || 0,
    };

    try {
      // Send the POST request to the Flask backend
      const response = await fetch('http://localhost:5000/calculate_wind_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Get the JSON response from the backend
      const data = await response.json();
      
      // Update the graph data state
      setGraphData(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h3>Log Profile Inputs</h3>
        <InputField label="z0 [m]" placeholder="Enter value" value={z0} onChange={setZ0} />
        <InputField label="Input Wind Speed [m/s]" placeholder="Enter value" value={inputWindSpeed} onChange={setInputWindSpeed} />
        <InputField label="Input Reference Height [m]" placeholder="Enter value" value={inputReferenceHeight} onChange={setInputReferenceHeight} />
        <InputField label="Desired Output Height [m]" placeholder="Enter value" value={desiredOutputHeight} onChange={setDesiredOutputHeight} />
        <Button label="Generate" onClick={handleGenerateClick} />
      </div>

      <div className="graph-section">
        {/* Render the Graph component with the graph data */}
        <Graph data={graphData} style={{ width: '100%', height: '100%' }} /> {/* Force the graph to fill space */}
      </div>
    </div>
  );
}
