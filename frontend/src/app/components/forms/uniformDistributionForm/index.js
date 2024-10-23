import React, { useState, useEffect } from 'react';
import InputField from '../../inputField/index.js';

export default function UniformDistributionForm({ onChange }) {
  const [crownRatio, setCrownRatio] = useState(0.7);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(8.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  // useEffect to propagate form data to the parent whenever inputs change
  useEffect(() => {
    const formData = {
      distribution: "uni",
      crownRatio,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };

    onChange(formData); // Automatically send the updated form data to the parent
  }, [crownRatio, leafAreaIndex, canopyHeight, dragCoefAth, onChange]);

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