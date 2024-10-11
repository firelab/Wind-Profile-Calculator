import React from 'react';
import './index.css';

export default function Button({ label, onClick }) {
  return (
    <button className="button" onClick={onClick}> 
      {label}
    </button>
  );
}

