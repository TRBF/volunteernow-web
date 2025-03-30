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
        opacity: 0.1,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${alpha(theme.palette.primary.main, 0.2)} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          animation: 'moveBackground 20s linear infinite',
          '@keyframes moveBackground': {
            '0%': {
              backgroundPosition: '0 0',
            },
            '100%': {
              backgroundPosition: '30px 30px',
            },
          },
        }}
      />
    </Box>
  );
};

export default BackgroundPattern; 