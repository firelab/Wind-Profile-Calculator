import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SelectMenuProps {
  options: { value: string; label: string }[]; // Array of option objects with value and label
  label: string; // Label for the select input
}

const SelectMenu: React.FC<SelectMenuProps> = ({ options, label }) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); // State to hold the selected value

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value); // Update state with selected value
  };

  return (
    <FormControl fullWidth>
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
