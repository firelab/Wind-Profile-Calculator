import React, { useState } from 'react';
import './index.css';
import ToggleSlider from './components/toggleSlider/index.js';
import ComboBox from './components/comboxBox/index.js';
import NormalDistributionForm from './components/forms/normalDistributionForm';
import MassmanDistributionForm from './components/forms/massmanDistributionForm';
import AsymmetricGaussianDistributionForm from './components/forms/asymmetricGaussianDistributionForm/index.js';
import TriangleDistributionForm from './components/forms/triangleDistributionForm';
import UniformDistributionForm from './components/forms/uniformDistributionForm/index.js';
import LogProfileForm from './components/forms/logProfileForm/index.js';
import Graph from './components/graph/index.js'; 
import Button from './components/button/index.js'; 

export default function App() {
  const [hasCanopy, setHasCanopy] = useState(false); // State for slider
  const [selectedOption, setSelectedOption] = useState('0');  // State to use default form
  const [formData, setFormData] = useState(null); // State to hold form data
  const [graphData, setGraphData] = useState(null); // State to hold the graph data

  const handleCanopyChange = () => {
    setHasCanopy((prev) => !prev);
    if (hasCanopy) {
      setSelectedOption(''); // Clear selected option if toggled off
    } else {
      setSelectedOption('0'); // Reset to Normal when toggling back on
    }
  };

  const options = [
    { value: '0', label: 'Normal', component: NormalDistributionForm },
    { value: '1', label: 'Massman', component: MassmanDistributionForm },
    { value: '2', label: 'Gaussian', component: AsymmetricGaussianDistributionForm},
    { value: '3', label: 'Triangle', component: TriangleDistributionForm },
    { value: '4', label: 'Uniform', component: UniformDistributionForm },
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected option:', selectedValue);
  };

  const handleFormSubmit = async () => {
    if (!formData) return; // Ensure there's data before submitting

    const payload = {
      distribution: formData.distribution || "log", // Add distribution field
      ...formData
    };

    try {
      const response = await fetch('http://localhost:5000/calculate_wind_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setGraphData(data); // Update the graph data in App component
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFormChange = (formData) => {
    setFormData(formData); // Collect form data and store it in state
  };

  const renderForm = () => {
    const selected = options.find(option => option.value === selectedOption);
    if (selected) {
      const FormComponent = selected.component;
      return <FormComponent onChange={handleFormChange} />;
    }
    return null;
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

      {/* Render LogProfileForm if there is no canopy */}
      {!hasCanopy && (
        <div>
          <LogProfileForm onChange={handleFormChange} />
        </div>
      )}

      {/* Render ComboBox and its corresponding form only when there is a canopy */}
      {hasCanopy && (
        <>
          {/* The combo box is aligned with the question */}
          <div className="combo-section">
            <h3>Distribution type?</h3>
            <ComboBox options={options} onChange={handleChange} />
          </div>

          {/* The form is rendered below and is block-level */}
          <div>
            {selectedOption && renderForm()}
          </div>
        </>
      )}

      {/* Submit Button */}
      <Button label="Generate" onClick={handleFormSubmit} />

      {/* Render the graph */}
      <div className="graph-section">
        <Graph data={graphData} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}
