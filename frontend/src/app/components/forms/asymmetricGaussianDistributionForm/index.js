import React, { useState, useEffect } from 'react';
import InputField from '../../inputField/index.js';

export default function AsymmetricGaussianDistributionForm({ onChange }) {
  const [heightMaxFoliageDist, setHeightMaxFoliageDist] = useState(0.36);
  const [standardDevFoliageUpper, setStandardDevFoliageUpper] = useState(0.6);
  const [standardDevFoliageLower, setStandardDevFoliageLower] = useState(0.2);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(8.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  // useEffect to propagate form data to the parent whenever inputs change
  useEffect(() => {
    const formData = {
      distribution: "asy", // Adding the distribution type
      heightMaxFoliageDist,
      standardDevFoliageUpper,
      standardDevFoliageLower,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };

    onChange(formData); // Automatically send the updated form data to the parent
  }, [heightMaxFoliageDist, standardDevFoliageUpper, standardDevFoliageLower, leafAreaIndex, canopyHeight, dragCoefAth, onChange]);

  return (
    <div>
      <h3>Asymmetric Gaussian Distribution Inputs</h3>
      <InputField label="Max Foliage Height" placeholder={"Enter Value"} value={heightMaxFoliageDist} onChange={setHeightMaxFoliageDist} />
      <InputField label="Upper Standard Deviation" placeholder={"Enter Value"} value={standardDevFoliageUpper} onChange={setStandardDevFoliageUpper} />
      <InputField label="Lower Standard Deviation" placeholder={"Enter Value"} value={standardDevFoliageLower} onChange={setStandardDevFoliageLower} />
      <InputField label="Leaf Area Index" placeholder={"Enter Value"} value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" placeholder={"Enter Value"} value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" placeholder={"Enter Value"} value={dragCoefAth} onChange={setDragCoefAth} />
    </div>
  );
}