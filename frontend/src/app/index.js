import React from 'react';
import './index.css';
import InputField from './components/inputField';
import Graph from './components/graph';
import Button from './components/button';

export default function App() {
  const handleButtonClick = (label) => {
    alert(`Button ${label} clicked`);
  };
  return (
    <div className="App">
      <h1>Log Profile</h1>
      <div className='input-container'>
      <InputField label="z0(m):" placeholder="Enter value" />
      <InputField label="Input Wind Speed(m/s):" placeholder="Enter value" />
      <InputField label="Input Reference Height(m):" placeholder="Enter value" />
      <InputField label="Desired Output Height:" placeholder="Enter value" />
      </div>
      <div className="button-container">
        <Button label="Generate" onClick={() => handleButtonClick("1")} />
        <Button label="Reset" onClick={() => handleButtonClick("2")} />
      </div>
      <Graph />
    </div>
  );
}
