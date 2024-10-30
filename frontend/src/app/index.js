import React, { useState } from 'react';
import './index.css';
import ToggleSlider from './components/toggleSlider/index.js';
import ComboBox from './components/comboxBox/index.js';
import LogProfileForm from './components/forms/logProfileForm/index.js';
import Graph from './components/graph/index.js'; 
import Button from './components/button/index.js'; 

export default function App() {
  const [hasCanopy, setHasCanopy] = useState(false); // State for slider
  const [selectedOption, setSelectedOption] = useState('0');  // State to use default form
  const [formData, setFormData] = useState(null); // State to hold form data
  const [graphData, setGraphData] = useState(null); // State to hold the graph data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to hold error messages

  const handleCanopyChange = () => {
    setHasCanopy((prev) => !prev);
    if (hasCanopy) {
      setSelectedOption(''); // Clear selected option if toggled off
    } else {
      setSelectedOption('0'); // Reset to Normal when toggling back on
    }
  };
/*
  const options = [
    { value: '0', label: 'Normal', component: NormalDistributionForm },
    { value: '1', label: 'Massman', component: MassmanDistributionForm },
    { value: '2', label: 'Gaussian', component: AsymmetricGaussianDistributionForm},
    { value: '3', label: 'Triangle', component: TriangleDistributionForm },
    { value: '4', label: 'Uniform', component: UniformDistributionForm },
  ];
*/
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected option:', selectedValue);
  };

  return (
    <div className="App">
      <h1>Canopy Calculator</h1>
  
      {/* Canopy Toggle Section */}
      <div className="canopy-section">
        <h3>Is there a canopy?</h3>
        <ToggleSlider
          onClick={handleCanopyChange}
          isChecked={hasCanopy}
          yesText="Yes"
          noText="No"
        />
      </div>
  
      {/* Layout container for the form and graph */}
      {!hasCanopy && (
        <div className="input-graph-container">
          <LogProfileForm />
        </div>
      )}
    </div>
  );
}
