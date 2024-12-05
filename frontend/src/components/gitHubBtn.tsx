import React from 'react';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';

const GitHubButton: React.FC = () => {
  const handleClick = () => {
    // Open the URL in a new tab
    window.open('https://github.com/firelab/canopy-flow/', '_blank');
  };

  return (
    <IconButton aria-label="github" size="large" onClick={handleClick}>
      <GitHubIcon fontSize="large" />
    </IconButton>
  );
}

export default GitHubButton;