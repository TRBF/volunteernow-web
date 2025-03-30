import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Chip,
  Avatar,
} from '@mui/material';
import { calloutsService } from '../services/api';

interface Callout {
  id: string;
  title: string;
  organization: string;
  description: string;
  requiredSkills: string[];
  deadline: string;
  organizationLogo?: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

const Callouts: React.FC = () => {
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [selectedCallout, setSelectedCallout] = useState<Callout | null>(null);
  const [responseDialog, setResponseDialog] = useState(false);
  const [response, setResponse] = useState({
    message: '',
    availability: [] as string[],
  });

  useEffect(() => {
    loadCallouts();
  }, []);

  const loadCallouts = async () => {
    try {
      const data = await calloutsService.getCallouts();
      setCallouts(data);
    } catch (error) {
      console.error('Failed to load callouts:', error);
    }
  };

  const handleRespond = (callout: Callout) => {
    setSelectedCallout(callout);
    setResponseDialog(true);
  };

  const handleCloseDialog = () => {
    setResponseDialog(false);
    setSelectedCallout(null);
    setResponse({
      message: '',
      availability: [],
    });
  };

  const handleSubmitResponse = async () => {
    if (!selectedCallout) return;
    
    try {
      await calloutsService.respondToCallout(selectedCallout.id, response);
      handleCloseDialog();
      // Optionally refresh the callouts list
      loadCallouts();
    } catch (error) {
      console.error('Failed to submit response:', error);
    }
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Urgent Callouts
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Organizations need your help! Respond to these urgent volunteer requests.
      </Typography>

      <Stack spacing={2}>
        {callouts.map((callout) => (
          <Card key={callout.id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={callout.organizationLogo}
                  sx={{ width: 40, height: 40, mr: 2 }}
                >
                  {callout.organization[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {callout.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {callout.organization}
                  </Typography>
                </Box>
                <Chip
                  label={`${callout.urgencyLevel} priority`}
                  color={getUrgencyColor(callout.urgencyLevel)}
                  size="small"
                  sx={{ ml: 'auto' }}
                />
              </Box>
              
              <Typography variant="body1" paragraph>
                {callout.description}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Required Skills:
                </Typography>
                {callout.requiredSkills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>

              <Typography variant="body2" color="text.secondary">
                Deadline: {new Date(callout.deadline).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => handleRespond(callout)}
                sx={{ ml: 'auto' }}
              >
                Respond to Callout
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      <Dialog open={responseDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Respond to Callout
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={4}
              value={response.message}
              onChange={(e) => setResponse(prev => ({ ...prev, message: e.target.value }))}
              margin="normal"
              placeholder="Describe your interest and relevant experience..."
            />
            <TextField
              fullWidth
              label="Your Availability"
              multiline
              rows={2}
              value={response.availability.join('\n')}
              onChange={(e) => setResponse(prev => ({
                ...prev,
                availability: e.target.value.split('\n').filter(Boolean),
              }))}
              margin="normal"
              placeholder="List your available times (one per line)"
              helperText="Enter each available time slot on a new line"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmitResponse}
            variant="contained"
            disabled={!response.message || response.availability.length === 0}
          >
            Submit Response
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Callouts; 