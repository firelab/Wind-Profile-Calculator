import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
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
            <TextField required id="heightMaxFoliageDist" label="Max Foliage Height" type="number" 
                value={formData.heightMaxFoliageDist} onChange={handleChange} />
            <TextField required id="standardDevFoliageUpper" label="Upper Std Dev" type="number" 
                value={formData.standardDevFoliageUpper} onChange={handleChange} />
            <TextField required id="standardDevFoliageLower" label="Lower Std Dev" type="number" 
                value={formData.standardDevFoliageLower} onChange={handleChange} />
            <TextField required id="leafAreaIndex" label="Leaf Area Index" type="number" 
                value={formData.leafAreaIndex} onChange={handleChange} />
            <TextField required id="canopyHeight [m]" label="Canopy Height" type="number" 
                value={formData.canopyHeight} onChange={handleChange} />
            <TextField required id="dragCoefAth" label="Drag Coefficient" type="number" 
                value={formData.dragCoefAth} onChange={handleChange} />
            <TextField required id="z0g [m]" label="Ground Roughness Length (z0g)" type="number" 
                value={formData.z0g} onChange={handleChange} />
            <TextField required id="numNodes" label="Number of Nodes" type="number" 
                value={formData.numNodes} onChange={handleChange} />
            <TextField required id="inputSpeed [m/s]" label="Input Wind Speed" type="number" 
                value={formData.inputSpeed} onChange={handleChange} />
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}
