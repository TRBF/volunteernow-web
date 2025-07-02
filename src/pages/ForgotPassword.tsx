import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
  useTheme,
} from '@mui/material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Redirect to the backend's password reset page
    window.location.href = 'https://api.volunteernow.eu/api/reset_password/';
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              mb: 3,
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Reset Password
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
            <CircularProgress size={40} />
            <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>
              Redirecting to password reset page...
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword; 