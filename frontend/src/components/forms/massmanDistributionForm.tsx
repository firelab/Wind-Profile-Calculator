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
        numNodes: 10001,
        inputSpeed: 10.0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: parseFloat(value),
        }));
    };

    const handleSubmit = async () => {
        // Calculate inputHeight dynamically based on canopyHeight
        const inputHeight = formData.canopyHeight + 6.096;

        try {
            const response = await axios.post("https://ninjastorm.firelab.org/windprofilecalculator/api", {
                ...formData,
                inputHeight,  // Add calculated inputHeight to the request payload
            });
            onSubmit(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Form</Typography>
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
            <TextField 
                required 
                id="inputSpeed [m/s]" 
                label="inputSpeed" 
                type="number" 
                value={formData.inputSpeed} 
                onChange={handleChange} 
            />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}
