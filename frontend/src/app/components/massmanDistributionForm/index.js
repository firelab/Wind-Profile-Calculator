import React, { useState } from 'react';
import InputField from '../inputField/index.js';
import Button from '../button/index.js';

export default function MassmanDistributionForm({ onSubmit }) {
  const [A1, setA1] = useState(1.10);
  const [A2, setA2] = useState(2.0);
  const [A3, setA3] = useState(1.0);
  const [zmax, setZmax] = useState(0.7);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(10.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  const handleGenerateClick = () => {
    const payload = {
      A1,
      A2,
      A3,
      zmax,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };
    onSubmit(payload); // Call the parent function to handle submission
  };

  return (
    <div>
      <InputField label="Parameter A1" value={A1} onChange={setA1} />
      <InputField label="Parameter A2" value={A2} onChange={setA2} />
      <InputField label="Parameter A3" value={A3} onChange={setA3} />
      <InputField label="Height to zmax" value={zmax} onChange={setZmax} />
      <InputField label="Leaf Area Index" value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" value={dragCoefAth} onChange={setDragCoefAth} />
      <Button label="Generate" onClick={handleGenerateClick} />
    </div>
  );
}