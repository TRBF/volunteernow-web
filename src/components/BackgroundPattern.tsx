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
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(251, 242, 255, 0.8) 0%, rgba(240, 230, 255, 0.8) 100%)',
          zIndex: 1,
        }}
      />
      
      {/* Dot pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, ${alpha('#7211a2', 0.1)} 1px, transparent 0),
            radial-gradient(circle at 1px 1px, ${alpha('#7211a2', 0.05)} 1px, transparent 0)
          `,
          backgroundSize: '40px 40px, 80px 80px',
          backgroundPosition: '0 0, 20px 20px',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Blurred circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#9b3fd4', 0.15)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#7211a2', 0.1)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default BackgroundPattern; 