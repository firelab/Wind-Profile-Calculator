import React, { useState } from 'react';
import InputField from '../inputField/index.js';
import Button from '../button/index.js';
import Graph from '../graph/index.js'; // Import the Graph component
import ComboBox from '../comboxBox/index.js';

export default function InputForm() {
  const [z0, setZ0] = useState('');
  const [inputWindSpeed, setInputWindSpeed] = useState('');
  const [inputReferenceHeight, setInputReferenceHeight] = useState('');
  const [desiredOutputHeight, setDesiredOutputHeight] = useState('');
  const [graphData, setGraphData] = useState(null); // State for graph data

  // State for first and second combo boxes
  const [selectedOption, setSelectedOption] = useState('');
  const [secondComboBoxOption, setSecondComboBoxOption] = useState('');

  const handleGenerateClick = async () => {
    // Convert string values to numbers
    const payload = {
      z0: parseFloat(z0) || 0, // Ensure non-zero default for z0
      input_wind_speed: parseFloat(inputWindSpeed) || 0,
      input_reference_height: parseFloat(inputReferenceHeight) || 0,
      desired_output_height: parseFloat(desiredOutputHeight) || 0,
      canopyType: selectedOption, // Include selected option from ComboBox
      secondOption: secondComboBoxOption // Include second ComboBox option if applicable
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

  // Handle changes in the first ComboBox
  const handleFirstComboBoxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle changes in the second ComboBox
  const handleSecondComboBoxChange = (event) => {
    setSecondComboBoxOption(event.target.value);
  };

  const firstComboBoxOptions = [
    { value: '0', label: 'No canopy' },
    { value: '1', label: 'Canopy' },
  ];

  // Options for the second ComboBox
  const secondComboBoxOptions = [
    { value: 'A', label: 'Option A' },
    { value: 'B', label: 'Option B' },
    { value: 'C', label: 'Option C' },
  ];

  return (
    <div>
      <ComboBox 
        options={firstComboBoxOptions} 
        onChange={handleFirstComboBoxChange} 
      />
      
      {/* Conditionally render the second ComboBox based on the first selection */}
      {selectedOption === '1' && (
        <ComboBox 
          options={secondComboBoxOptions} 
          onChange={handleSecondComboBoxChange} 
        />
      )}

      <InputField label="z0 [m]" placeholder="Enter value" value={z0} onChange={setZ0} />
      <InputField label="Input Wind Speed [m/s]" placeholder="Enter value" value={inputWindSpeed} onChange={setInputWindSpeed} />
      <InputField label="Input Reference Height [m]" placeholder="Enter value" value={inputReferenceHeight} onChange={setInputReferenceHeight} />
      <InputField label="Desired Output Height [m]" placeholder="Enter value" value={desiredOutputHeight} onChange={setDesiredOutputHeight} />
      <Button label="Generate" onClick={handleGenerateClick} />
      
      {/* Render the Graph component with the graph data */}
      <Graph data={graphData} />
    </div>
  );
}