import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const InfoButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="info" size="large" onClick={handleOpen}>
        <InfoIcon fontSize="large" />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="info-dialog-title">
        <DialogTitle id="info-dialog-title">What is a Wind Profile Calculator?</DialogTitle>
        <DialogContent>
            <p>
                Sample test explaining what a wind profile is, what the distributions mean, etc.
            </p>
            <p>
                Learn more by reading our research paper:&nbsp;
                <a href="https://research.fs.usda.gov/treesearch/54040" target="_blank" rel="noopener noreferrer">
                    An improved canopy wind model for predicting wind adjustment factors and wildland fire behavior
                </a>.
            </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoButton;