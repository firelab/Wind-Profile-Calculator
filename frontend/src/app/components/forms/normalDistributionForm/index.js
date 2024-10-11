import React, { useState } from 'react';
import InputField from '../../inputField/index.js';
import Button from '../../button/index.js';


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
      <h3>Normal Distribution Inputs</h3>
      <InputField label="Max Foliage Height" placeholder={"Enter Value"} value={heightMaxFoliageDist} onChange={setHeightMaxFoliageDist} />
      <InputField label="Standard Deviation" placeholder={"Enter Value"} value={standardDevFoliageDist} onChange={setStandardDevFoliageDist} />
      <InputField label="Leaf Area Index" placeholder={"Enter Value"} value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" placeholder={"Enter Value"} value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" placeholder={"Enter Value"} value={dragCoefAth} onChange={setDragCoefAth} />
      <Button label="Generate" onClick={handleGenerateClick} />
    </div>
  );
}