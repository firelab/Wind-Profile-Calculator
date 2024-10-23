import React, { useState, useEffect } from 'react';
import InputField from '../../inputField/index.js';

export default function LogProfileForm({ onChange }) {
  const [z0, setZ0] = useState('0.43');
  const [inputWindSpeed, setInputWindSpeed] = useState('4');
  const [inputReferenceHeight, setInputReferenceHeight] = useState('10');
  const [desiredOutputHeight, setDesiredOutputHeight] = useState('6.096');

  // useEffect to propagate form data to the parent when any input changes
  useEffect(() => {
    const formData = {
      distribution: "log",
      z0: parseFloat(z0),
      inputWindSpeed: parseFloat(inputWindSpeed),
      inputReferenceHeight: parseFloat(inputReferenceHeight),
      desiredOutputHeight: parseFloat(desiredOutputHeight),
    };

    onChange(formData); // Automatically send updated form data to parent
  }, [z0, inputWindSpeed, inputReferenceHeight, desiredOutputHeight, onChange]);

  return (
    <div className="container">
      <div className="form-section">
        <h3>Log Profile Inputs</h3>
        <InputField label="z0 [m]" placeholder="Enter value" value={z0} onChange={setZ0} />
        <InputField label="Input Wind Speed [m/s]" placeholder="Enter value" value={inputWindSpeed} onChange={setInputWindSpeed} />
        <InputField label="Input Reference Height [m]" placeholder="Enter value" value={inputReferenceHeight} onChange={setInputReferenceHeight} />
        <InputField label="Desired Output Height [m]" placeholder="Enter value" value={desiredOutputHeight} onChange={setDesiredOutputHeight} />
      </div>
    </div>
  );
}
