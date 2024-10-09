import React, { useState } from 'react';
import './index.css'; // Assuming your styles are in the same file

export default function MultipleChoice({ question, options, onChange }) {
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option

  const handleOptionChange = (value) => {
    setSelectedOption(value); // Set selected option
    onChange(value); // Notify the parent component of the selected value
  };

  return (
    <div className="multiple-choice">
      <h3>{question}</h3>
      <div className="options-wrapper">
        {options.map((option, index) => (
          <label key={index} className="radio-container">
            <input
              type="radio" // Ensure this is a radio button
              name="multipleChoice" // Name should be the same for grouped radio buttons
              value={option.value} // Value for the radio button
              checked={selectedOption === option.value} // Check if this option is selected
              onChange={() => handleOptionChange(option.value)} // Handle selection change
            />
            <span className="bubble"></span> {/* Custom bubble */}
            {option.label} {/* Display the option label */}
          </label>
        ))}
      </div>
    </div>
  );
}