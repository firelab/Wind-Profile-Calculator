import React from 'react';
import './index.css'; // Ensure you have the necessary styles

export default function ToggleSlider({ onClick }) {
  return (
    <label className="toggle-slider">
      <input type="checkbox" className="toggle-checkbox" onChange={onClick} />
      <span className="slider" />
    </label>
  );
}


