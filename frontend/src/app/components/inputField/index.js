import React from 'react';
import './index.css';

export default function InputField({ label, placeholder, value, onChange }) {
  return (
    <div className="input-field-container">
      <label className="input-label">{label}</label>
      <input
        type="text"
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}  // Pass the new value to the onChange handler
      />
    </div>
  );
}