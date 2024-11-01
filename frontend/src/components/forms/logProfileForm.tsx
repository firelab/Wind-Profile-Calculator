import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function LogProfileForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [formData, setFormData] = useState({
        z0: 0.43,
        inputWindSpeed: 4,
        inputReferenceHeight: 10,
        desiredOutputHeight: 6.093,
        distribution: 'log', 
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
            // Send data to the backend
            const response = await axios.post('http://localhost:5000/calculate_wind_profile', formData);
            // Call onSubmit prop to pass data to the parent component
            onSubmit(response.data); // Ensure response.data matches your expected structure
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="200px"
        >
            <Typography
                variant="h6"
                component="h2"
                gutterBottom
                alignSelf="flex-start"
                sx={{ marginBottom: -1 }}
            >
                Log Profile Form
            </Typography>
            <TextField
                required
                id="z0"
                label="z0"
                type="number"
                value={formData.z0}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <TextField
                required
                id="inputWindSpeed"
                label="Input Wind Speed"
                type="number"
                value={formData.inputWindSpeed}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <TextField
                required
                id="inputReferenceHeight"
                label="Input Reference Height"
                type="number"
                value={formData.inputReferenceHeight}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <TextField
                required
                id="desiredOutputHeight"
                label="Desired Output Height"
                type="number"
                value={formData.desiredOutputHeight}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
}
