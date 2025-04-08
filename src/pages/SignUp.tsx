import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { authService } from '../services/api';

// Define the form data interface with proper types
interface SignUpFormData {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    birthday: new Date(),
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        birthday: date,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('[SignUp] Submitting form data:', formData);
      
      // Convert the formData with Date to API-compatible format with string
      const apiFormData = {
        ...formData,
        birthday: formData.birthday.toISOString().split('T')[0] // Convert Date to YYYY-MM-DD
      };
      
      const success = await authService.signUp(apiFormData);
      console.log('[SignUp] Signup response:', success);
      if (success) {
        navigate('/');
      } else {
        console.error('[SignUp] Registration failed');
      }
    } catch (err) {
      console.error('[SignUp] Signup error:', err);
    }
  };

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
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Create your VolunteerNow account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Box>
              <TextField
                required
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birthday"
                  value={formData.birthday}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                onClick={() => navigate('/login')}
                sx={{ cursor: 'pointer' }}
                variant="body2"
              >
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp; 