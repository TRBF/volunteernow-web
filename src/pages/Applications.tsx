import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import Header from '../components/Header';
import ApplicationsTab from '../components/ApplicationsTab';

const Applications = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, ml: '280px', p: 3 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Applications
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
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