import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function TriangleDistributionForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        distribution: 'tri',
        A1: 0.32,
        Ax: 1.0,
        Ab: 0.02,
        zmax: 0.36,
        zbot: 0.12,
        leafAreaIndex: 3.28,
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
            <TextField required id="A1" label="A1" type="number" value={formData.A1} onChange={handleChange} />
            <TextField required id="Ax" label="Ax" type="number" value={formData.Ax} onChange={handleChange} />
            <TextField required id="Ab" label="Ab" type="number" value={formData.Ab} onChange={handleChange} />
            <TextField required id="zmax" label="zmax" type="number" value={formData.zmax} onChange={handleChange} />
            <TextField required id="zbot" label="zbot" type="number" value={formData.zbot} onChange={handleChange} />
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
