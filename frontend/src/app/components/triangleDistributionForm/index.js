import React, { useState } from 'react';
import InputField from '../inputField/index.js';
import Button from '../button/index.js';

export default function TriangleDistributionForm({ onSubmit }) {
  const [A1, setA1] = useState(0.32);
  const [Ax, setAx] = useState(1.0);
  const [Ab, setAb] = useState(0.02);
  const [zmax, setZmax] = useState(0.36);
  const [zbot, setZbot] = useState(0.12);
  const [leafAreaIndex, setLeafAreaIndex] = useState(3.28);
  const [canopyHeight, setCanopyHeight] = useState(10.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  const handleGenerateClick = () => {
    const payload = {
      A1,
      Ax,
      Ab,
      zmax,
      zbot,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };
    onSubmit(payload); // Call the parent function to handle submission
  };

  return (
    <div>
      <InputField label="Density of Top" value={A1} onChange={setA1} />
      <InputField label="Density at Max Point" value={Ax} onChange={setAx} />
      <InputField label="Density of Bottom" value={Ab} onChange={setAb} />
      <InputField label="Height to Ax" value={zmax} onChange={setZmax} />
      <InputField label="Height to Bottom" value={zbot} onChange={setZbot} />
      <InputField label="Leaf Area Index" value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" value={dragCoefAth} onChange={setDragCoefAth} />
      <Button label="Generate" onClick={handleGenerateClick} />
    </div>
  );
}
