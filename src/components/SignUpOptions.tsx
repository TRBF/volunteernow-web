import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

const SignUpOptions = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };

  const handleDirectSignUp = () => {
    setOpen(false);
    navigate('/register/direct');
  };

  const handleApplicationLink = () => {
    // This will be handled by the opportunity details page
    setOpen(false);
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="sm">
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
            variant="h4"
            sx={{
              mb: 4,
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          >
            Choose Sign Up Method
          </Typography>

          <Box sx={{ width: '100%', mb: 4 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<PersonAddIcon />}
              onClick={handleDirectSignUp}
              sx={{
                mb: 2,
                py: 2,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Direct Registration
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              Create an account directly on VolunteerNow
            </Typography>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<LinkIcon />}
              onClick={handleApplicationLink}
              sx={{
                py: 2,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              Application Link
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              Get a link to apply for a specific opportunity
            </Typography>
          </Box>

          <Button
            variant="text"
            onClick={handleClose}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.text.primary,
              },
            }}
          >
            Cancel
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpOptions; 