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
            id="heightMaxFoliageDist"
            label="Max Foliage Height"
            type="number"
            value={formData.heightMaxFoliageDist}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="standardDevFoliageUpper"
            label="Upper Std Dev"
            type="number"
            value={formData.standardDevFoliageUpper}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="standardDevFoliageLower"
            label="Lower Std Dev"
            type="number"
            value={formData.standardDevFoliageLower}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="leafAreaIndex"
            label="Leaf Area Index"
            type="number"
            value={formData.leafAreaIndex}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="canopyHeight"
            label="Canopy Height"
            type="number"
            value={formData.canopyHeight}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="dragCoefAth"
            label="Drag Coefficient"
            type="number"
            value={formData.dragCoefAth}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="z0g"
            label="Ground Roughness Length (z0g)"
            type="number"
            value={formData.z0g}
            onChange={handleChange}
            fullWidth
        />
        <TextField
            required
            id="numNodes"
            label="Number of Nodes"
            type="number"
            value={formData.numNodes}
            onChange={handleChange}
            fullWidth
        />
        <Button variant="contained" onClick={handleSubmit}>
            Submit
        </Button>
    </Box>
    );
}
