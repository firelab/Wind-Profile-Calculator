import React, { useState } from 'react';
import Graph from '../../graph/index';
import './index.css';

export default function LogProfileForm() {
  const [z0, setZ0] = useState('0.43');
  const [inputWindSpeed, setInputWindSpeed] = useState('4');
  const [inputReferenceHeight, setInputReferenceHeight] = useState('10');
  const [desiredOutputHeight, setDesiredOutputHeight] = useState('6.096');
  const [graphData, setGraphData] = useState(null);

  const formData = {
    distribution: "log",
    z0: parseFloat(z0),
    inputWindSpeed: parseFloat(inputWindSpeed),
    inputReferenceHeight: parseFloat(inputReferenceHeight),
    desiredOutputHeight: parseFloat(desiredOutputHeight),
  };

  const handleGenerate = async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    try {
      const response = await fetch('http://localhost:5000/calculate_wind_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Response from server:', data);
      
      setGraphData(data);
      // Handle any additional actions with the response data if needed
    } catch (error) {
      console.error('Failed to send form data:', error);
    }
  };

  return (
    <div className="form-graph-wrapper">
      <div className="form-container">
        <form className="form-section">
          <h3>Log Profile Inputs</h3>
          {/* Input fields here */}
          <div>
            <label htmlFor="z0">z0 [m]</label>
            <input
              id="z0"
              type="number"
              placeholder="Enter value"
              value={z0}
              onChange={(e) => setZ0(e.target.value)}
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="inputWindSpeed">Input Wind Speed [m/s]</label>
            <input
              id="inputWindSpeed"
              type="number"
              placeholder="Enter value"
              value={inputWindSpeed}
              onChange={(e) => setInputWindSpeed(e.target.value)}
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="inputReferenceHeight">Input Reference Height [m]</label>
            <input
              id="inputReferenceHeight"
              type="number"
              placeholder="Enter value"
              value={inputReferenceHeight}
              onChange={(e) => setInputReferenceHeight(e.target.value)}
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="desiredOutputHeight">Desired Output Height [m]</label>
            <input
              id="desiredOutputHeight"
              type="number"
              placeholder="Enter value"
              value={desiredOutputHeight}
              onChange={(e) => setDesiredOutputHeight(e.target.value)}
              step="0.01"
            />
          </div>
          <button onClick={handleGenerate} type="button">Submit</button>
        </form>
      </div>
  
      {graphData && (
        <div className="graph-container">
          <Graph data={graphData} />
        </div>
      )}
    </div>
  );
}
