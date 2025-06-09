import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { profileService } from '../services/api';

// Helper function to get full media URL
const getMediaUrl = (path: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `https://api.volunteernow.ro${path}`;
};

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  profile: {
    username: string;
    first_name: string;
    last_name: string;
    description: string;
    profile_picture: string;
    id: number;
  };
  onProfileUpdate: () => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  profile,
  onProfileUpdate,
}) => {
  const [formData, setFormData] = useState({
    username: profile.username,
    first_name: profile.first_name,
    last_name: profile.last_name,
    description: profile.description,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    setProfilePicture(getMediaUrl(profile.profile_picture));
  }, [profile.profile_picture]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Update profile information
      await profileService.updateProfile(formData);

      // Update profile picture if a new one was selected and it's a valid file
      if (selectedFile && selectedFile instanceof File && selectedFile.size > 0) {
        await profileService.updateProfilePicture(selectedFile, parseInt(localStorage.getItem('user_id') || '0'));
      }

      onProfileUpdate();
      onClose();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-picture-upload">
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    '& .overlay': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Avatar
                  src={selectedFile ? URL.createObjectURL(selectedFile) : profilePicture}
                  sx={{ 
                    width: 120, 
                    height: 120,
                    border: '2px solid',
                    borderColor: 'primary.main',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <PhotoCamera sx={{ color: 'white', fontSize: 40 }} />
                </Box>
              </Box>
            </label>
            <Typography variant="caption" color="text.secondary">
              Click to change profile picture
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={4}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog; 