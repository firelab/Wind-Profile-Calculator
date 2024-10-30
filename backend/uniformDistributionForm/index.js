import React, { useState } from 'react';
import InputField from '../../frontend/src/app/components/inputField/index.js';

export default function UniformDistributionForm({ onChange }) {
  const [crownRatio, setCrownRatio] = useState(0.7);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(8.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  // Function to handle sending the form data when the button is clicked
  const handleSubmit = () => {
    const formData = {
      distribution: "uni",
      crownRatio,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };

    onChange(formData); // Send the updated form data to the parent
  };

  return (
    <div>
      <h3>Uniform Distribution Inputs</h3>
      <InputField label="Crown Ratio" placeholder={"Enter Value"} value={crownRatio} onChange={setCrownRatio} />
      <InputField label="Leaf Area Index" placeholder={"Enter Value"} value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" placeholder={"Enter Value"} value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" placeholder={"Enter Value"} value={dragCoefAth} onChange={setDragCoefAth} />
    </div>
  );
}