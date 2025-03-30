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
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { experienceService } from '../services/api';

interface Experience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [open, setOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({
    organization: '',
    role: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    description: '',
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await experienceService.getUserExperience();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to load experiences:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewExperience({
      organization: '',
      role: '',
      startDate: null,
      endDate: null,
      description: '',
      skills: [],
    });
    setNewSkill('');
  };

  const handleAddSkill = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newSkill.trim()) {
      event.preventDefault();
      setNewExperience(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setNewExperience(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!newExperience.organization || !newExperience.role || !newExperience.startDate) {
        return;
      }
      await experienceService.addExperience({
        title: newExperience.role,
        description: newExperience.description,
        date: newExperience.startDate.toISOString(),
        skills: newExperience.skills,
        impact: newExperience.description,
        startDate: newExperience.startDate,
        endDate: newExperience.endDate || undefined,
        organization: newExperience.organization,
        role: newExperience.role
      });
      handleClose();
      loadExperiences();
    } catch (error) {
      console.error('Failed to add experience:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await experienceService.deleteExperience(id);
      loadExperiences();
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          My Experience
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Experience
        </Button>
      </Box>

      <Stack spacing={2}>
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {experience.role}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {experience.organization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {new Date(experience.startDate).toLocaleDateString()} - 
                    {experience.endDate 
                      ? new Date(experience.endDate).toLocaleDateString()
                      : 'Present'}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={() => handleDelete(experience.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" paragraph>
                {experience.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                {experience.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Experience</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Organization"
              value={newExperience.organization}
              onChange={(e) => setNewExperience(prev => ({ ...prev, organization: e.target.value }))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Role"
              value={newExperience.role}
              onChange={(e) => setNewExperience(prev => ({ ...prev, role: e.target.value }))}
              margin="normal"
            />
            <Box sx={{ mt: 2, mb: 2 }}>
              <DatePicker
                label="Start Date"
                value={newExperience.startDate}
                onChange={(date) => setNewExperience(prev => ({ ...prev, startDate: date }))}
              />
              <Box sx={{ display: 'inline-block', ml: 2 }}>
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
              label="Add Skills (Press Enter)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleAddSkill}
              margin="normal"
              helperText="Press Enter to add a skill"
            />
            <Box sx={{ mt: 1 }}>
              {newExperience.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Experience
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Experience; 