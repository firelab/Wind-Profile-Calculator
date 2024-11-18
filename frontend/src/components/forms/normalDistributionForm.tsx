import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function NormalDistributionForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        distribution: 'norm',
        heightMaxFoliageDist: 0.5,
        standardDevFoliageDist: 0.3,
        leafAreaIndex: 1.0,
        canopyHeight: 3.0,
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
            const response = await axios.post('http://localhost:5000/calculate_wind_profile', {
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
            <TextField required id="heightMaxFoliageDist" label="heightMaxFoliageDist" type="number" value={formData.heightMaxFoliageDist} onChange={handleChange} />
            <TextField required id="standardDevFoliageDist" label="standardDevFoliageDist" type="number" value={formData.standardDevFoliageDist} onChange={handleChange} />
            <TextField required id="leafAreaIndex" label="leafAreaIndex" type="number" value={formData.leafAreaIndex} onChange={handleChange} />
            <TextField required id="canopyHeight" label="canopyHeight [m]" type="number" value={formData.canopyHeight} onChange={handleChange} />
            <TextField required id="dragCoefAth" label="dragCoefAth" type="number" value={formData.dragCoefAth} onChange={handleChange} />
            <TextField required id="z0g" label="z0g [m]" type="number" value={formData.z0g} onChange={handleChange} />
            <TextField required id="numNodes" label="numNodes" type="number" value={formData.numNodes} onChange={handleChange} />
            <TextField required id="inputSpeed" label="inputSpeed [m/s]" type="number" value={formData.inputSpeed} onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}