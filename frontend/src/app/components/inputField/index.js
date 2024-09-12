import React from 'react';
import './index.css';

export default function InputField({ label, placeholder }) {
  return (
    <div className="input-field-container">
      <label className="input-label">{label}</label>
      <input type="text" className="input-field" placeholder={placeholder} />
    </div>
  );
}