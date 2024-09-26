import React, { useState } from 'react';
import './index.css';
import InputForm from './components/inputForm/index.js';
import DoubleGaussianDistributionForm from './components/doubleGaussianDistributionForm';
import NormalDistributionForm from './components/normalDistributionForm';
import TriangleDistributionForm from './components/triangleDistributionForm';
import MassmanDistributionForm from './components/massmanDistributionForm';

export default function App() {
  const [hasCanopy, setHasCanopy] = useState('');
  const [selectedDistribution, setSelectedDistribution] = useState('');

  const handleCanopyChange = (event) => {
    setHasCanopy(event.target.value);
    // Reset the distribution selection when changing canopy selection
    setSelectedDistribution('');
  };

  const handleDistributionChange = (event) => {
    setSelectedDistribution(event.target.value);
  };

  const renderDistributionSelector = () => {
    if (hasCanopy === '') {
      return null; // Hide distribution selector if there is no canopy
    } else if (hasCanopy === 'no') {
      return <InputForm />;
    }

    return (
      <div>
        <select value={selectedDistribution} onChange={handleDistributionChange}>
          <option value="">Select Canopy Distribution</option>
          <option value="doubleGaussian">Double Gaussian Distribution</option>
          <option value="normal">Normal Distribution</option>
          <option value="triangle">Triangle Distribution</option>
          <option value="massman">Massman Distribution</option>
        </select>
        {renderDistributionForm()}
      </div>
    );
  };

  const renderDistributionForm = () => {
    if (hasCanopy === 'yes') {
      // Show corresponding form based on distribution selection
      switch (selectedDistribution) {
        case 'doubleGaussian':
          return <DoubleGaussianDistributionForm onSubmit={handleSubmit} />;
        case 'normal':
          return <NormalDistributionForm onSubmit={handleSubmit} />;
        case 'triangle':
          return <TriangleDistributionForm onSubmit={handleSubmit} />;
        case 'massman':
          return <MassmanDistributionForm onSubmit={handleSubmit} />;
        default:
          return null; // No form to display if no distribution is selected
      }
    } else {
      // Show original input form if there's no canopy
      return <InputForm />;
    }
  };

  const handleSubmit = (data) => {
    // Handle the submission data
    console.log('Submitted data:', data);
  };

  return (
    <div className="App">
      <h1>Log Profile Calculator</h1>
      <select value={hasCanopy} onChange={handleCanopyChange}>
        <option value="">Select Canopy Option</option>
        <option value="yes">Yes, there is a canopy</option>
        <option value="no">No, there is no canopy</option>
      </select>
      {renderDistributionSelector()}
    </div>
  );
}