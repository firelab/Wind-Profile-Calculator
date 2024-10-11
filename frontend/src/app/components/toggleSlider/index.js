import React from 'react';
import './index.css'; // Ensure you have the necessary styles

export default function ToggleSlider({ onClick, isChecked, yesText, noText }) {
  return (
    <div className="toggle-container">
      <label className="toggle-slider">
        <input type="checkbox" className="toggle-checkbox" onChange={onClick} checked={isChecked} />
        <span className="slider" />
      </label>
      <span>{isChecked ? yesText : noText}</span> {/* Conditional text based on toggle state */}
    </div>
  );
}