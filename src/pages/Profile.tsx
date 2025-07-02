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
  Container,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { profileService, experienceService } from '../services/api';
import EditProfileDialog from '../components/EditProfileDialog';

// Helper function to get full media URL
const getMediaUrl = (path: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `https://api.volunteernow.eu${path}`;
};

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

interface Experience {
  id: string;
  role: string;
  organiser: string;
  description: string;
  start_date: string;
  end_date: string;
  hours: string;
  participation_picture?: string;
}

interface EditProfileData {
  username: string;
  first_name: string;
  last_name: string;
  description: string;
  profile_picture: string;
  id: number;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<EditProfileData | null>(null);

  useEffect(() => {
    fetchProfile();
    fetchExperiences();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getUserProfileById(Number(id));
      setProfile(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const data = await experienceService.getUserExperience(Number(id));
      setExperiences(data);
    } catch (err) {
      console.error('Error fetching experiences:', err);
    }
  };

  const handleEdit = () => {
    if (profile) {
      setEditingProfile({
        id: profile.id,
        username: profile.username,
        first_name: profile.first_name,
        last_name: profile.last_name,
        description: profile.description,
        profile_picture: profile.profile_picture,
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProfile(null);
  };

  const handleProfileUpdate = () => {
    fetchProfile();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh" gap={2}>
        <Typography color="error" variant="h6">
          {error || 'Profile not found'}
        </Typography>
        <Typography color="text.secondary">
          Please try refreshing the page or contact support if the issue persists.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {profile.cover_image && (
              <Box
                component="img"
                src={getMediaUrl(profile.cover_image)}
                alt="Cover"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.1,
                }}
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, gap: 3 }}>
              <Avatar
                src={getMediaUrl(profile.profile_picture)}
                alt={profile.username}
                sx={{ width: { xs: 120, sm: 150 }, height: { xs: 120, sm: 150 } }}
              />
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h4" gutterBottom>
                  {profile.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  @{profile.username}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ mt: 2 }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Stats */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box 
              display="flex" 
              flexDirection={{ xs: 'row', sm: 'row' }} 
              gap={{ xs: 1, sm: 4 }}
              justifyContent={{ xs: 'space-between', sm: 'flex-start' }}
            >
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6">{profile.hours}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Volunteer Hours
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6">{profile.count}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Events Attended
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h6">{profile.most_fq}</Typography>
                <Typography color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Most Frequent Activity
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Typography paragraph>
              {profile.description || "No description provided"}
            </Typography>
          </Paper>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
            <Box display="flex" gap={1} flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
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
          </Paper>
        </Grid>

        {/* Experiences Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Experiences</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {experiences.length === 0 ? (
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  No experiences yet
                </Typography>
              </Paper>
            ) : (
              experiences.map((experience) => (
                <Paper key={experience.id} elevation={2} sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {experience.role}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {experience.organiser}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {new Date(experience.start_date).toLocaleDateString()} - 
                          {experience.end_date 
                            ? new Date(experience.end_date).toLocaleDateString()
                            : 'Present'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Hours: {experience.hours}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {experience.description}
                    </Typography>
                  </CardContent>
                </Paper>
              ))
            )}
          </Box>
        </Grid>
      </Grid>

      {editingProfile && (
        <EditProfileDialog
          open={open}
          onClose={handleClose}
          profile={editingProfile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </Container>
  );
};

export default Profile;