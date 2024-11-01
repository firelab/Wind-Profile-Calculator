import './App.css';

import LogProfileForm from './components/forms/logProfileForm';
import UniformDistributionForm from './components/forms/uniformDistributionForm';
import AsymmetricGaussianForm from './components/forms/asymmetricGaussianForm';
import NormalDistributionForm from './components/forms/normalDistributionForm';
import TriangleDistributionForm from './components/forms/triangleDistributionForm';
import MassmanDistributionForm from './components/forms/massmanDistributionForm';
import Chart from './components/chart';
import SelectMenu from './components/select';
import { Box, Grid2, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useState } from 'react';

export default function App() {
  const [chartData, setChartData] = useState({ heights: [], windSpeeds: [] });
  const [distributionType, setDistributionType] = useState<string>('');
  const [canopyType, setCanopyType] = useState<string>('');

  const handleFormSubmit = (data: any) => {
    setChartData(data);
  };

  const handleDistributionChange = (value: string) => {
    setDistributionType(value);
  };

  const handleCanopyChange = (value: string) => {
    setCanopyType(value);
    setDistributionType(''); // Reset distribution type when canopy type changes
  };

  const distOptions = [
    { value: 'uniform', label: 'Uniform' },
    { value: 'asymmetricGaussian', label: 'Asymmetric Gaussian' },
    { value: 'normal', label: 'Normal' },
    { value: 'triangle', label: 'Triangle' },
    { value: 'massman', label: 'Massman' },
  ];

  const canOptions = [
    { value: '0', label: 'Has Canopy' },
    { value: '1', label: 'Has No Canopy' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ mb: 3 }}>
        Canopy Flow Calculator
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Canopy Type Select */}
          <SelectMenu 
            options={canOptions} 
            label="Select Canopy Type" 
            onChange={handleCanopyChange} 
          />

          {/* Distribution Type Select */}
          <FormControl sx={{ m: 1, minWidth: 120 }} disabled={canopyType !== '0'}>
            <InputLabel id="distribution-select-label">Select Canopy Distribution</InputLabel>
            <Select
              labelId="distribution-select-label"
              id="distribution-select"
              value={distributionType}
              label="Select Canopy Distribution"
              onChange={(event) => handleDistributionChange(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {distOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {canopyType !== '0' && <FormHelperText>Disabled</FormHelperText>}
          </FormControl>

          {/* Render specific distribution forms based on selection */}
          {distributionType === 'uniform' && <UniformDistributionForm onSubmit={handleFormSubmit} />}
          {distributionType === 'asymmetricGaussian' && <AsymmetricGaussianForm onSubmit={handleFormSubmit} />}
          {distributionType === 'normal' && <NormalDistributionForm onSubmit={handleFormSubmit} />}
          {distributionType === 'triangle' && <TriangleDistributionForm onSubmit={handleFormSubmit} />}
          {distributionType === 'massman' && <MassmanDistributionForm onSubmit={handleFormSubmit} />}

          {/* LogProfileForm shown only when no canopy is selected */}
          {canopyType === '1' && <LogProfileForm onSubmit={handleFormSubmit} />}
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 8, md: 9 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Chart heights={chartData.windSpeeds} windSpeeds={chartData.heights} />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
