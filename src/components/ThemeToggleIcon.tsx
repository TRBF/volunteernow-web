import React from 'react';
import { Box } from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';

interface ThemeToggleIconProps {
  isDarkMode: boolean;
  size?: number;
  color?: string;
}

const ThemeToggleIcon: React.FC<ThemeToggleIconProps> = ({ 
  isDarkMode, 
  size = 28, 
  color = 'text.secondary' 
}) => {
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isDarkMode ? 0 : 1,
          transform: isDarkMode ? 'rotate(-90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <DarkModeIcon sx={{ color, fontSize: size }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isDarkMode ? 1 : 0,
          transform: isDarkMode ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0.8)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <LightModeIcon sx={{ color, fontSize: size }} />
      </Box>
    </Box>
  );
};

export default ThemeToggleIcon; 