import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import Header from '../components/Header';

const Applications = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header showSearch={true} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: '280px', 
          p: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '1024px',
          }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              width: '100%',
              maxWidth: '800px',
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Applications
            </Typography>
            <Typography variant="body1">
              This page will show your volunteer applications and their status.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Applications; 