import './App.css';

import LogProfileForm from './components/forms/logProfileForm';
import UniformDistributionForm from './components/forms/uniformDistributionForm';
import AsymmetricGaussianForm from './components/forms/asymmetricGaussianForm';
import NormalDistributionForm from './components/forms/normalDistributionForm';
import TriangleDistributionForm from './components/forms/triangleDistributionForm';
import MassmanDistributionForm from './components/forms/massmanDistributionForm';
import Chart from './components/chart';
import SelectMenu from './components/select';
import GitHubButton from './components/gitHubBtn';
import InfoButton from './components/infoBtn';
import { Box, Grid2, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useState } from 'react';

export default function App() {
  const [chartData, setChartData] = useState({ heights: [], windSpeeds: [], inputHeightIndex: 0, desiredOutputHeightIndex: 0});
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
    { value: '0', label: 'Uniform' },
    { value: '1', label: 'Asymmetric Gaussian' },
    { value: '2', label: 'Normal' },
    { value: '3', label: 'Triangle' },
    { value: '4', label: 'Massman' },
  ];

  const canOptions = [
    { value: '0', label: 'Canopy' },
    { value: '1', label: 'No Canopy' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Grid2 container alignItems="center" sx={{ mb: 3 }}>
        <Grid2>
          <Typography variant="h3" component="h2" gutterBottom align="left" sx={{ mb: 0}}>
            Wind Profile Calculator | 
          </Typography>
        </Grid2>
        <Grid2>
          <GitHubButton />
          <InfoButton />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={6}>
        <Grid2
          size={{ xs: 12, sm: 4, md: 2, lg: 2, xl: 2}}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2}}
        >
          <Box 
          display="flex" 
          flexDirection="column" 
          gap={3}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            alignSelf="flex-start"
            sx={{ marginBottom: -1 }}
          >
            Canopy Settings
          </Typography>

          <SelectMenu 
            options={canOptions} 
            label="Select Type" 
            onChange={handleCanopyChange} 
            disabled= {false}
          />
          <SelectMenu 
            options={distOptions} 
            label="Select Canopy Distribution" 
            onChange={handleDistributionChange}
            disabled={canopyType !== '0'} 
          />
          </Box>
  
          {distributionType === '0' && <UniformDistributionForm onSubmit={handleFormSubmit} />}
          {distributionType === '1' && <AsymmetricGaussianForm onSubmit={handleFormSubmit} />}
          {distributionType === '2' && <NormalDistributionForm onSubmit={handleFormSubmit} />}
          {distributionType === '3' && <TriangleDistributionForm onSubmit={handleFormSubmit} />}
          {distributionType === '4' && <MassmanDistributionForm onSubmit={handleFormSubmit} />}
  
          {canopyType === '1' && <LogProfileForm onSubmit={handleFormSubmit} />}
        </Grid2>
  
        <Grid2
          size="auto"
          sx={{ display: 'flex', flexDirection: 'column', height: '80vh', overflow: 'visible' }}
        >
          <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'visible'}}>
            <Chart heights={chartData.heights} windSpeeds={chartData.windSpeeds} inputHeightIndex={chartData.inputHeightIndex} desiredOutputHeightIndex={chartData.desiredOutputHeightIndex} />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
  
}
