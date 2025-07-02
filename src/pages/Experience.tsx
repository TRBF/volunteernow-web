import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Image as ImageIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { experienceService } from '../services/api';

const MEDIA_BASE_URL = 'https://api.volunteernow.ro';

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

const Experience: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newExperience, setNewExperience] = useState({
    role: '',
    organiser: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    description: '',
    hours: '0',
  });
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await experienceService.getUserExperience(Number(localStorage.getItem('user_id')));
      setExperiences(data);
    } catch (error) {
      console.error('Failed to load experiences:', error);
      setError(error instanceof Error ? error.message : 'Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingExperience(null);
    setNewExperience({
      role: '',
      organiser: '',
      startDate: null,
      endDate: null,
      description: '',
      hours: '0',
    });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setNewExperience({
      role: experience.role,
      organiser: experience.organiser,
      startDate: new Date(experience.start_date),
      endDate: experience.end_date ? new Date(experience.end_date) : null,
      description: experience.description,
      hours: experience.hours,
    });
    setImagePreview(experience.participation_picture || null);
    setOpen(true);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!newExperience.role || !newExperience.organiser || !newExperience.startDate) {
        console.error('[Experience] Validation failed: Required fields missing');
        return;
      }

      if (!newExperience.hours || parseInt(newExperience.hours) < 0) {
        console.error('[Experience] Validation failed: Invalid hours value');
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('[Experience] User not logged in');
        return;
      }

      let experienceId: string;
      if (editingExperience) {
        console.log('[Experience] Updating existing experience:', editingExperience.id);
        const response = await experienceService.updateExperience(editingExperience.id, {
          role: newExperience.role,
          organiser: newExperience.organiser,
          description: newExperience.description || '',
          startDate: newExperience.startDate,
          endDate: newExperience.endDate || undefined,
          hours: newExperience.hours,
        });
        experienceId = editingExperience.id;
      } else {
        console.log('[Experience] Creating new experience');
        const response = await experienceService.addExperience({
          role: newExperience.role,
          organiser: newExperience.organiser,
          description: newExperience.description || '',
          startDate: newExperience.startDate,
          endDate: newExperience.endDate || undefined,
          hours: newExperience.hours,
        });
        experienceId = response.id;
      }

      // Upload image if selected
      if (selectedImage) {
        console.log('[Experience] Uploading experience picture');
        await experienceService.updateExperiencePicture(experienceId, selectedImage);
      }

      handleClose();
      loadExperiences();
    } catch (error) {
      console.error('[Experience] Failed to save experience:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('[Experience] Deleting experience:', id);
      await experienceService.deleteExperience(id);
      loadExperiences();
    } catch (error) {
      console.error('[Experience] Failed to delete experience:', error);
    }
  };

  const getImageUrl = (path: string | undefined) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${MEDIA_BASE_URL}${path}`;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h4" component="h1">
          My Experience
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ 
            width: { xs: '100%', sm: 'auto' },
            borderRadius: 2,
          }}
        >
          Add Experience
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {experiences.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No experiences yet. Add your first experience!
          </Typography>
        ) : (
          experiences.map((experience) => (
            <Card key={experience.id}>
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
                  <Box>
                    <IconButton 
                      onClick={() => handleEdit(experience)}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(experience.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
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
            </Card>
          ))
        )}
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 1, sm: 2 },
          }
        }}
      >
        <DialogTitle>
          {editingExperience ? 'Edit Experience' : 'Add New Experience'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Organization"
              value={newExperience.organiser}
              onChange={(e) => setNewExperience(prev => ({ ...prev, organiser: e.target.value }))}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Role"
              value={newExperience.role}
              onChange={(e) => setNewExperience(prev => ({ ...prev, role: e.target.value }))}
              margin="normal"
              required
            />
            <Box sx={{ 
              mt: 2, 
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}>
              <DatePicker
                label="Start Date"
                value={newExperience.startDate}
                onChange={(date) => setNewExperience(prev => ({ ...prev, startDate: date }))}
                slotProps={{ textField: { required: true } }}
              />
              <Box sx={{ display: 'inline-block', ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
                <DatePicker
                  label="End Date"
                  value={newExperience.endDate}
                  onChange={(date) => setNewExperience(prev => ({ ...prev, endDate: date }))}
                />
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newExperience.description}
              onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Hours"
              type="number"
              value={newExperience.hours}
              onChange={(e) => setNewExperience(prev => ({ ...prev, hours: e.target.value }))}
              margin="normal"
              required
            />

            <Box sx={{ mt: 3 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="experience-image-upload"
                type="file"
                onChange={handleImageSelect}
              />
              <label htmlFor="experience-image-upload">
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '2px dashed',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {imagePreview ? (
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: imagePreview ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                        padding: 2,
                        borderRadius: 1,
                      }}
                    >
                      <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                      <Typography variant="body1" color="primary">
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        Recommended size: 800x600px
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </label>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            {editingExperience ? 'Save Changes' : 'Add Experience'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Experience; 