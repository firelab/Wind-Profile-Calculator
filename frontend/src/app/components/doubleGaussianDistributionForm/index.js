import React, { useState } from 'react';
import InputField from '../inputField/index.js';
import Button from '../button/index.js';

export default function DoubleGaussianDistributionForm({ onSubmit }) {
  const [heightMaxFoliageDist, setHeightMaxFoliageDist] = useState(0.36);
  const [standardDevFoliageUpper, setStandardDevFoliageUpper] = useState(0.6);
  const [standardDevFoliageLower, setStandardDevFoliageLower] = useState(0.2);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(8.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  const handleGenerateClick = () => {
    const payload = {
      heightMaxFoliageDist,
      standardDevFoliageUpper,
      standardDevFoliageLower,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };
    onSubmit(payload); // Call the parent function to handle submission
  };

  return (
    <div>
      <InputField label="Max Foliage Height" value={heightMaxFoliageDist} onChange={setHeightMaxFoliageDist} />
      <InputField label="Upper Standard Deviation" value={standardDevFoliageUpper} onChange={setStandardDevFoliageUpper} />
      <InputField label="Lower Standard Deviation" value={standardDevFoliageLower} onChange={setStandardDevFoliageLower} />
      <InputField label="Leaf Area Index" value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" value={dragCoefAth} onChange={setDragCoefAth} />
      <Button label="Generate" onClick={handleGenerateClick} />
    </div>
  );
}