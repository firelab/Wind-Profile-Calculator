import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SelectMenuProps {
  options: { value: string; label: string }[]; // Array of option objects with value and label
  label: string; // Label for the select input
  onChange: (value: string) => void; // Prop to handle value changes
}

const SelectMenu: React.FC<SelectMenuProps> = ({ options, label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // State to hold the selected value

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value; // Get the new value from the event
    setSelectedValue(newValue); // Update state with selected value
    onChange(newValue); // Call the onChange prop with the new value
  };

  return (
    <FormControl>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        value={selectedValue}
        label={label}
        onChange={handleChange} // Attach onChange handler
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectMenu;

