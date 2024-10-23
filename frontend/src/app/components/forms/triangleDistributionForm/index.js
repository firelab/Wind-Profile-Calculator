import React, { useState, useEffect } from 'react';
import InputField from '../../inputField/index.js';

export default function TriangleDistributionForm({ onChange }) {
  const [A1, setA1] = useState(0.32);
  const [Ax, setAx] = useState(1.0);
  const [Ab, setAb] = useState(0.02);
  const [zmax, setZmax] = useState(0.36);
  const [zbot, setZbot] = useState(0.12);
  const [leafAreaIndex, setLeafAreaIndex] = useState(3.28);
  const [canopyHeight, setCanopyHeight] = useState(10.0);
  const [dragCoefAth, setDragCoefAth] = useState(0.2);

  // useEffect to propagate form data to the parent whenever inputs change
  useEffect(() => {
    const formData = {
      distribution: "tri",
      A1,
      Ax,
      Ab,
      zmax,
      zbot,
      leafAreaIndex,
      canopyHeight,
      dragCoefAth,
    };

    onChange(formData); // Automatically send the updated form data to the parent
  }, [A1, Ax, Ab, zmax, zbot, leafAreaIndex, canopyHeight, dragCoefAth, onChange]);

  return (
    <div>
      <h3>Triangle Distribution Inputs</h3>
      <InputField label="Density of Top" placeholder={"Enter Value"} value={A1} onChange={setA1} />
      <InputField label="Density at Max Point" placeholder={"Enter Value"} value={Ax} onChange={setAx} />
      <InputField label="Density of Bottom" placeholder={"Enter Value"} value={Ab} onChange={setAb} />
      <InputField label="Height to Ax" placeholder={"Enter Value"} value={zmax} onChange={setZmax} />
      <InputField label="Height to Bottom" placeholder={"Enter Value"} value={zbot} onChange={setZbot} />
      <InputField label="Leaf Area Index" placeholder={"Enter Value"} value={leafAreaIndex} onChange={setLeafAreaIndex} />
      <InputField label="Canopy Height (m)" placeholder={"Enter Value"} value={canopyHeight} onChange={setCanopyHeight} />
      <InputField label="Drag Coefficient" placeholder={"Enter Value"} value={dragCoefAth} onChange={setDragCoefAth} />
    </div>
  );
}
