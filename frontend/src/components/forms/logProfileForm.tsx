import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function LogProfileForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        z0: 0.43,
        originalURef: 0.43,
        originalZRef: 0.43,
        desiredZRef: 0.43,
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: parseFloat(value), // Convert input to a float
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        onSubmit(formData); // Call the parent handler
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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
                id="originalURef"
                label="original u ref"
                type="number"
                value={formData.originalURef}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <TextField
                required
                id="originalZRef"
                label="original z ref"
                type="number"
                value={formData.originalZRef}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <TextField
                required
                id="desiredZRef"
                label="desired z ref"
                type="number"
                value={formData.desiredZRef}
                onChange={handleChange}
                inputProps={{ min: 0 }}
            />
            <Button type="submit" variant="contained">Submit</Button>
        </Box>
    );
}
