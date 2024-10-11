import React, { useState } from 'react';
import InputField from '../../inputField/index.js';
import Button from '../../button/index.js';


export default function UniformDistributionForm({ onSubmit }) {
  const [crownRatio, setCrownRatio] = useState(0.7);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(8.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  const handleGenerateClick = () => {
    const payload = {
      crownRatio,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };
    onSubmit(payload); // Call the parent function to handle submission
  };

  return (
    <div>
    <h3>Uniform Distribution Inputs</h3>
      <InputField label="Crown Ratio" placeholder={"Enter Value"} value={crownRatio} onChange={setCrownRatio} />
      <InputField label="Leaf Area Index" placeholder={"Enter Value"} value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" placeholder={"Enter Value"} value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" placeholder={"Enter Value"} value={dragCoefAth} onChange={setDragCoefAth} />
      <Button label="Generate" onClick={handleGenerateClick} />
    </div>
  );
}
