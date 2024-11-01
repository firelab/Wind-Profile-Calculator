import './App.css';

import LogProfileForm from './components/forms/logProfileForm';
import Chart from './components/chart';
import SelectMenu from './components/select';
import { Box, Grid2, Typography } from '@mui/material';

export default function App() {
  const distOptions = [
    { value: '0', label: 'Normal' },
    { value: '1', label: 'Uniform' },
    { value: '2', label: 'Asymmetric' },
    { value: '3', label: 'Triangle' },
    { value: '4', label: 'Massman' },
  ];

  const canOptions = [
    { value: '0', label: 'Has Canopy' },
    { value: '1', label: 'Has No Canopy' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="center"
        sx={{ mb: 3 }}
      >
        Canopy Flow Calculator
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 4, md: 3 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SelectMenu options={canOptions} label="Select Canopy Type" />
          <SelectMenu options={distOptions} label="Select Canopy Distribution" />
          <LogProfileForm />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 8, md: 9 }} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Chart />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}




  /*
  return (
    <div className="App">
      <div className="title">
        <h1>Canopy Flow Calculator</h1> 
      </div>
        <div className="container">
          <div className="form-container">
            <SelectMenu options={canOptions} label="Select Canopy Type" />           
            <SelectMenu options={distOptions} label="Select Canopy Distribution" />           
            <LogProfileForm />
          </div>
          <div className="graph-container">
          <Chart></Chart>
          </div>
        </div>
    </div>
  );
  */
