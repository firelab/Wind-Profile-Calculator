import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SelectMenuProps {
  options: { value: string; label: string }[];
  label: string; 
  onChange: (value: string) => void; 
  disabled: boolean;
}

const SelectMenu: React.FC<SelectMenuProps> = ({ options, label, onChange, disabled }) => {
  const [selectedValue, setSelectedValue] = useState<string>(''); 

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value; 
    setSelectedValue(newValue); 
    onChange(newValue); 
  };

  return (
    <FormControl disabled={disabled}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        value={selectedValue}
        label={label}
        onChange={handleChange}
        disabled={disabled}
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

