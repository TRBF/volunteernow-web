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
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { profileService, experienceService } from '../services/api';
import EditProfileDialog from '../components/EditProfileDialog';

const MEDIA_BASE_URL = 'https://api.volunteernow.ro';

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

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const currentUserId = localStorage.getItem('user_id');
  const isOwnProfile = currentUserId === id;

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.getUserProfileById(Number(id));
      setProfile(data);
      setProfilePicture(await profileService.getUserProfilePictureById(Number(id)));
      setError(null);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const experiences = await experienceService.getUserExperience(Number(id));
      setExperiences(experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchExperiences();
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleProfileUpdate = () => {
    fetchProfile();
  };

  const getImageUrl = (path: string | undefined) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${MEDIA_BASE_URL}${path}`;
  };

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                src={profilePicture}
                alt={profile.username}
                sx={{ width: 120, height: 120 }}
              />
              <Box sx={{ flex: 1 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h4">
                    {profile.first_name} {profile.last_name}
                  </Typography>
                  {isOwnProfile && (
                    <Button
                      startIcon={<EditIcon />}
                      onClick={handleEditClick}
                      variant="outlined"
                      size="small"
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  @{profile.username}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" gap={4}>
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
          </Paper>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Typography paragraph>
              {profile.description || "No description provided"}
            </Typography>
          </Paper>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
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
                    {experience.participation_picture && (
                      <Box
                        component="img"
                        src={getImageUrl(experience.participation_picture)}
                        alt="Experience"
                        sx={{
                          width: '100%',
                          maxHeight: 200,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mt: 2,
                        }}
                      />
                    )}
                  </CardContent>
                </Paper>
              ))
            )}
          </Box>
        </Grid>
      </Grid>

      {isOwnProfile && profile && (
        <EditProfileDialog
          open={isEditDialogOpen}
          onClose={handleEditClose}
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />
      )}
    </Container>
  );
};

export default Profile;