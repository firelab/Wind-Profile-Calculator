import React, { useState } from 'react';
import InputField from '../inputField/index.js';
import Button from '../button/index.js';

export default function NormalDistributionForm({ onSubmit }) {
  const [heightMaxFoliageDist, setHeightMaxFoliageDist] = useState(0.5);
  const [standardDevFoliageDist, setStandardDevFoliageDist] = useState(0.3);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(3.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  const handleGenerateClick = () => {
    const payload = {
      heightMaxFoliageDist,
      standardDevFoliageDist,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };
    onSubmit(payload); // Call the parent function to handle submission
  };

  return (
    <div>
      <InputField label="Max Foliage Height" value={heightMaxFoliageDist} onChange={setHeightMaxFoliageDist} />
      <InputField label="Standard Deviation" value={standardDevFoliageDist} onChange={setStandardDevFoliageDist} />
      <InputField label="Leaf Area Index" value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" value={dragCoefAth} onChange={setDragCoefAth} />
      <Button label="Generate" onClick={handleGenerateClick} />
    </div>
  );
}