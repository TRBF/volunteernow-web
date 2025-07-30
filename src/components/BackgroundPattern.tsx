import React from 'react';
import { Box, alpha } from '@mui/material';
import Dot from './Dot';

const BackgroundPattern: React.FC = () => {
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
      {/* Dot pattern using Dot component - positioned before gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Dot
          color={alpha('#8027ab', 0.8)}
          size={1}
          spacing={15}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 1,
          }}
        />
        <Dot
          color={alpha('#8027ab', 0.6)}
          size={1}
          spacing={30}
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            right: 0,
            bottom: 0,
            opacity: 1,
          }}
        />
      </Box>

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(251, 242, 255, 0.5) 0%, rgba(240, 230, 255, 0.5) 100%)',
          zIndex: 1,
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