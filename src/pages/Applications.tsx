import React from 'react';
import { Container, Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import Header from '../components/Header';
import ApplicationsTab from '../components/ApplicationsTab';

const Applications = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: { xs: 0, sm: '72px', md: '240px' }, 
          p: { xs: 2, sm: 3 },
          width: { xs: '100%', sm: `calc(100% - 72px)`, md: `calc(100% - 240px)` },
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 6 } }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 4 },
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem' },
                mb: { xs: 2, sm: 4 },
              }}
            >
              Applications
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: { xs: 2, sm: 4 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              This page will show your volunteer applications and their status.
            </Typography>
            <ApplicationsTab />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Applications; 