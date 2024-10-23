import React, { useState, useEffect } from 'react';
import InputField from '../../inputField/index.js';

export default function MassmanDistributionForm({ onChange }) {
  const [A1, setA1] = useState(1.10);
  const [A2, setA2] = useState(2.0);
  const [A3, setA3] = useState(1.0);
  const [zmax, setZmax] = useState(0.7);
  const [leafAreaIndex, setLeafAreaIndex] = useState(1.0);
  const [canopyHeight, setCanopyHeight] = useState(10.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  // Use useEffect to send form data to the parent whenever the form values change
  useEffect(() => {
    const payload = {
      distribution: "mass",
      A1,
      A2,
      A3,
      zmax,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };

    onChange(payload); // Send form data to the parent whenever inputs change
  }, [A1, A2, A3, zmax, leafAreaIndex, canopyHeight, dragCoefAth, onChange]);

  return (
    <div>
      <h3>Massman Distribution Inputs</h3>
      <InputField label="Parameter A1" placeholder={"Enter Value"} value={A1} onChange={setA1} />
      <InputField label="Parameter A2" placeholder={"Enter Value"} value={A2} onChange={setA2} />
      <InputField label="Parameter A3" placeholder={"Enter Value"} value={A3} onChange={setA3} />
      <InputField label="Height to zmax" placeholder={"Enter Value"} value={zmax} onChange={setZmax} />
      <InputField label="Leaf Area Index" placeholder={"Enter Value"} value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" placeholder={"Enter Value"} value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" placeholder={"Enter Value"} value={dragCoefAth} onChange={setDragCoefAth} />
    </div>
  );
}
