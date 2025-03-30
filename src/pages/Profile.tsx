import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Container
} from '@mui/material';
import { profileService } from '../services/api';

interface Profile {
  id: number;
  profile_picture: string;
  username: string;
  first_name: string;
  last_name: string;
  name: string;
  date_of_birth: string;
  gender: string | null;
  description: string;
  account_type: string;
  cover_image: string | null;
  user: number;
  hours: number;
  most_fq: string;
  count: number;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await profileService.getUserProfileById(Number(id));
        setProfile(data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>Profile not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12} display="flex" alignItems="center" gap={3}>
            <Avatar
              src={profile.profile_picture}
              alt={profile.username}
              sx={{ width: 120, height: 120 }}
            />
            <Box>
              <Typography variant="h4">
                {profile.first_name} {profile.last_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                @{profile.username}
              </Typography>
            </Box>
          </Grid>

          {/* Stats Section */}
          <Grid item xs={12}>
            <Box display="flex" gap={4} my={2}>
              <Box>
                <Typography variant="h6">{profile.hours}</Typography>
                <Typography color="text.secondary">Volunteer Hours</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{profile.count}</Typography>
                <Typography color="text.secondary">Events Attended</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{profile.most_fq}</Typography>
                <Typography color="text.secondary">Most Frequent Activity</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Typography paragraph>
              {profile.description || "No description provided"}
            </Typography>
          </Grid>

          {/* Additional Info */}
          <Grid item xs={12}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {profile.date_of_birth && (
                <Chip 
                  label={`Birthday: ${new Date(profile.date_of_birth).toLocaleDateString()}`}
                  variant="outlined"
                />
              )}
              {profile.gender && (
                <Chip 
                  label={`Gender: ${profile.gender}`}
                  variant="outlined"
                />
              )}
              {profile.account_type && (
                <Chip 
                  label={`Account Type: ${profile.account_type}`}
                  variant="outlined"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;