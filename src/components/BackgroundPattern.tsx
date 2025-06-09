import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';

const BackgroundPattern: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
        opacity: 1,
        pointerEvents: 'none',
        transform: 'rotate(45deg)',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle, #7211a2 0.8px, transparent 2.5px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0',
          opacity: 0.15,
        }}
      />
    </Box>
  );
};

export default BackgroundPattern; 