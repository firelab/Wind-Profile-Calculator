import React from 'react';
import './index.css';

export default function ComboBox({ options, onChange }) {
  return (
    <select className="custom-combobox" onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
