import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Tooltip } from '@mui/material';
import axios from 'axios';

export default function AsymmetricGaussianForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        distribution: 'asy',
        heightMaxFoliageDist: 0.36,
        standardDevFoliageUpper: 0.6,
        standardDevFoliageLower: 0.2,
        leafAreaIndex: 1.0,
        canopyHeight: 8.0,
        dragCoefAth: 0.2,
        z0g: 0.0075,
        numNodes: 1000,
        inputSpeed: 10.0,
        inputHeight: 6.096,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: parseFloat(value),
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000//windprofilecalculator/api/calculate", formData);
            //const response = await axios.post("https://ninjastorm.firelab.org/windprofilecalculator/api/calculate", formData);
            onSubmit(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            alignSelf="flex-start"
            sx={{ marginBottom: -1 }}
          >
            Form
          </Typography>
    
          <Tooltip title="Enter the wind speed in meters per second" arrow>
            <TextField
              required
              id="inputSpeed"
              label="Input Wind Speed"
              type="number"
              value={formData.inputSpeed}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the height at which the wind speed is measured, in meters" arrow>
            <TextField
              required
              id="inputHeight"
              label="Input Wind Height"
              type="number"
              value={formData.inputHeight}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the maximum height of the foliage in meters" arrow>
            <TextField
              required
              id="heightMaxFoliageDist"
              label="Max Foliage Height"
              type="number"
              value={formData.heightMaxFoliageDist}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the standard deviation for the upper part of the foliage distribution" arrow>
            <TextField
              required
              id="standardDevFoliageUpper"
              label="Upper Std Dev"
              type="number"
              value={formData.standardDevFoliageUpper}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the standard deviation for the lower part of the foliage distribution" arrow>
            <TextField
              required
              id="standardDevFoliageLower"
              label="Lower Std Dev"
              type="number"
              value={formData.standardDevFoliageLower}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the leaf area index (LAI), a measure of leaf density" arrow>
            <TextField
              required
              id="leafAreaIndex"
              label="Leaf Area Index"
              type="number"
              value={formData.leafAreaIndex}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the canopy height, typically measured in meters" arrow>
            <TextField
              required
              id="canopyHeight"
              label="Canopy Height"
              type="number"
              value={formData.canopyHeight}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the drag coefficient for atmospheric conditions" arrow>
            <TextField
              required
              id="dragCoefAth"
              label="Drag Coefficient"
              type="number"
              value={formData.dragCoefAth}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the ground roughness length (z0g), a measure of surface roughness" arrow>
            <TextField
              required
              id="z0g"
              label="Ground Roughness Length (z0g)"
              type="number"
              value={formData.z0g}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Tooltip title="Enter the number of nodes in the system" arrow>
            <TextField
              required
              id="numNodes"
              label="Number of Nodes"
              type="number"
              value={formData.numNodes}
              onChange={handleChange}
              fullWidth
            />
          </Tooltip>
    
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
    );
};