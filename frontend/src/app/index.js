import React, { useState } from 'react';
import './index.css';
import ToggleSlider from './components/toggleSlider/index.js';
import MultipleChoice from './components/multipleChoice/index.js';
import NormalDistributionForm from './components/normalDistributionForm';
import MassmanDistributionForm from './components/massmanDistributionForm';
import DoubleGaussianDistributionForm from './components/doubleGaussianDistributionForm';
import TriangleDistributionForm from './components/triangleDistributionForm';
import LogProfileForm from './components/logProfileForm'; // Import LogProfileForm

export default function App() {
  const [hasCanopy, setHasCanopy] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Handle slider change: toggle canopy presence
  const handleCanopyChange = () => {
    console.log('Toggling canopy state');
    setHasCanopy((prev) => !prev);
    // Reset selected option when toggling to "No Canopy"
    if (hasCanopy) {
      setSelectedOption('');
    }
  };

  const options = [
    { value: 'option1', label: 'Normal', component: NormalDistributionForm },
    { value: 'option2', label: 'Massman', component: MassmanDistributionForm },
    { value: 'option3', label: 'Gaussian', component: DoubleGaussianDistributionForm },
    { value: 'option4', label: 'Triangle', component: TriangleDistributionForm },
  ];

  // Handle the selection change from the MultipleChoice component
  const handleMultipleChoiceChange = (value) => {
    setSelectedOption(value);
    console.log('Selected option:', value);
  };

  const renderForm = () => {
    const selected = options.find(option => option.value === selectedOption);
    if (selected) {
      const FormComponent = selected.component; // Get the form component
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
        yesText="Yes"  // Text for the "Yes" state
        noText="No"    // Text for the "No" state
      />
    </div>

    {/* Render LogProfileForm if there is no canopy */}
      {!hasCanopy && <LogProfileForm />}

      {/* Render MultipleChoice and its corresponding form only when there is a canopy */}
      {hasCanopy && (
        <>
          <MultipleChoice
            question="What type of canopy do you have?"
            options={options}
            onChange={handleMultipleChoiceChange}
          />
          {/* Render the selected distribution form if an option is selected */}
          {selectedOption && renderForm()}
        </>
      )}
    </div>
  );
}