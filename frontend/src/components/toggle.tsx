import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

export default function ToggleButtons() {
  const [canopy, setCanopy] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setCanopy(newAlignment);
  };

  return (
    <div>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="left"
        sx={{ marginBottom: 0 }}
      >
        Select Canopy Option
      </Typography>
      <FormControl fullWidth>
        <ToggleButtonGroup
          value={canopy}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            value="left"
            aria-label="Yes Canopy"
            sx={{ textTransform: 'none' }}
          >
            Has a Canopy
          </ToggleButton>
          <ToggleButton
            value="right"
            aria-label="No canopy"
            sx={{ textTransform: 'none' }}
          >
            Has no Canopy
          </ToggleButton>
        </ToggleButtonGroup>
      </FormControl>
    </div>
  );
}
