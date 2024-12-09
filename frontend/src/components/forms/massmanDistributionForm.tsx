import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function MassmanDistributionForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        distribution: 'mass',
        A1: 1.10,
        A2: 2.0,
        A3: 1.0,
        zmax: 0.7,
        leafAreaIndex: 1.0,
        canopyHeight: 10.0,
        dragCoefAth: 0.2,
        z0g: 0.0075,
        numNodes: 1000,
        inputSpeed: 10.0,
        inputHeight: 6.096,
        desiredOutputHeight: 10,
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
                Wind Profile Inputs
            </Typography>
            <TextField
                required
                id="inputSpeed"
                label="Input Wind Speed"
                type="number"
                value={formData.inputSpeed}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="inputHeight"
                label="Input Wind Height"
                type="number"
                value={formData.desiredOutputHeight}
                onChange={handleChange}
                fullWidth
            />
            <TextField
              required
                id="desiredOutputHeight"
                label="Desired Output Height"
              type="number"
              value={formData.inputHeight}
              onChange={handleChange}
              fullWidth
            />
            <TextField 
                required 
                id="A1" 
                label="A1" 
                type="number" 
                value={formData.A1} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="A2" 
                label="A2" 
                type="number" 
                value={formData.A2} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="A3" 
                label="A3" 
                type="number" 
                value={formData.A3} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="zmax" 
                label="zmax" 
                type="number" 
                value={formData.zmax} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="leafAreaIndex" 
                label="leafAreaIndex" 
                type="number" 
                value={formData.leafAreaIndex} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="canopyHeight" 
                label="canopyHeight" 
                type="number" 
                value={formData.canopyHeight} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="dragCoefAth" 
                label="dragCoefAth" 
                type="number" 
                value={formData.dragCoefAth} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="z0g [m]" 
                label="z0g" 
                type="number" 
                value={formData.z0g} 
                onChange={handleChange} 
            />
            <TextField 
                required 
                id="numNodes" 
                label="numNodes" 
                type="number" 
                value={formData.numNodes} 
                onChange={handleChange} 
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>        
        </Box>
    );
}
