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
        <Box
        display="flex"
        flexDirection="column"
        gap={2}
        >
            <Typography
                variant="h6"
                component="h2"
                gutterBottom
                alignSelf="flex-start"
                sx={{ marginBottom: -1 }}
            >
                Form
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
                fullWidth
            />
            <TextField
                required
                id="Ax"
                label="Ax"
                type="number"
                value={formData.Ax}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="Ab"
                label="Ab"
                type="number"
                value={formData.Ab}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="zmax"
                label="zmax"
                type="number"
                value={formData.zmax}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="zbot"
                label="zbot"
                type="number"
                value={formData.zbot}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="leafAreaIndex"
                label="leafAreaIndex"
                type="number"
                value={formData.leafAreaIndex}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="canopyHeight"
                label="canopyHeight [m]"
                type="number"
                value={formData.canopyHeight}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="dragCoefAth"
                label="dragCoefAth"
                type="number"
                value={formData.dragCoefAth}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="z0g"
                label="z0g [m]"
                type="number"
                value={formData.z0g}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="numNodes"
                label="numNodes"
                type="number"
                value={formData.numNodes}
                onChange={handleChange}
                fullWidth
            />
            <Button
                variant="contained"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Box>
    );
}
