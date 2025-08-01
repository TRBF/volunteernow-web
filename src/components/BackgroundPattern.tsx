import React from 'react';
import { Box, alpha, useTheme as useMuiTheme } from '@mui/material';
import Dot from './Dot';

const BackgroundPattern: React.FC = () => {
  const theme = useMuiTheme();
  const isDark = theme.palette.mode === 'dark';
  
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
      {/* Dot pattern */}
      <Dot
        color={alpha(isDark ? '#b388ff' : '#4f0c73', 0.4)}
        size={1}
        spacing={20}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1,
          transition: 'all 0.3s ease-in-out',
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark 
            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.5) 0%, rgba(26, 26, 26, 0.5) 100%)'
            : 'linear-gradient(135deg, rgba(251, 242, 255, 0.5) 0%, rgba(240, 230, 255, 0.5) 100%)',
          zIndex: 1,
          transition: 'all 0.3s ease-in-out',
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
          background: isDark 
            ? `radial-gradient(circle, ${alpha('#e1b5ff', 0.15)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha('#9b3fd4', 0.15)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0,
          transition: 'all 0.3s ease-in-out',
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
          background: isDark 
            ? `radial-gradient(circle, ${alpha('#b388ff', 0.1)} 0%, transparent 70%)`
            : `radial-gradient(circle, ${alpha('#7211a2', 0.1)} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: 0,
          transition: 'all 0.3s ease-in-out',
        }}
      />
    </Box>
  );
};

export default BackgroundPattern; 