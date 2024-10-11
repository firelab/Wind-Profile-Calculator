import React, { useState } from 'react';
import './index.css';
import ToggleSlider from './components/toggleSlider/index.js';
import ComboBox from './components/comboxBox/index.js';
import NormalDistributionForm from './components/forms/normalDistributionForm';
import MassmanDistributionForm from './components/forms/massmanDistributionForm';
import DoubleGaussianDistributionForm from './components/forms/doubleGaussianDistributionForm';
import TriangleDistributionForm from './components/forms/triangleDistributionForm';
import UniformDistributionForm from './components/forms/uniformDistributionForm/index.js';
import LogProfileForm from './components/forms/logProfileForm/index.js';

export default function App() {
  const [hasCanopy, setHasCanopy] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1'); // Set default to 'option1' (Normal)

  const handleCanopyChange = () => {
    setHasCanopy((prev) => !prev);
    if (hasCanopy) {
      setSelectedOption(''); // Clear selected option if toggled off
    } else {
      setSelectedOption('option1'); // Reset to Normal when toggling back on
    }
  };

  const options = [
    { value: 'option1', label: 'Normal', component: NormalDistributionForm },
    { value: 'option2', label: 'Massman', component: MassmanDistributionForm },
    { value: 'option3', label: 'Gaussian', component: DoubleGaussianDistributionForm },
    { value: 'option4', label: 'Triangle', component: TriangleDistributionForm },
    { value: 'option5', label: 'Uniform', component: UniformDistributionForm },
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log('Selected option:', selectedValue);
  };

  const renderForm = () => {
    const selected = options.find(option => option.value === selectedOption);
    if (selected) {
      const FormComponent = selected.component;
      return <FormComponent onSubmit={(data) => console.log('Form submitted:', data)} />;
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
          <LogProfileForm />
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
    </div>
  );
}