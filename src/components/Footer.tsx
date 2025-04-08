import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' VolunteerNow. All rights reserved.'}
          </Typography>
          <Box sx={{ mx: 2 }}>
            <Link component={RouterLink} to="/gdpr" color="inherit" underline="hover">
              GDPR & Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 