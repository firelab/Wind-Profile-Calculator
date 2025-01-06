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
            //const response = await axios.post("http://localhost:5002//windprofilecalculator/api/calculate", formData);
            const response = await axios.post("https://ninjastorm.firelab.org/windprofilecalculator/api/calculate", formData);
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
              id="desired outputs height"
              label="Desired Output Wind Height"
              type="number"
              value={formData.inputHeight}
              onChange={handleChange}
              fullWidth
            />
            <TextField
                required
                id="heightMaxFoliageDist"
                label="heightMaxFoliageDist"
                type="number"
                value={formData.heightMaxFoliageDist}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                required
                id="standardDevFoliageDist"
                label="standardDevFoliageDist"
                type="number"
                value={formData.standardDevFoliageDist}
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