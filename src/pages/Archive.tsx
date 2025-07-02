import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Rating,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { archiveService } from '../services/api';

const MEDIA_BASE_URL = 'https://api.volunteernow.eu';

interface PastEvent {
  id: number;
  name: string;
  description: string;
  time: string;
  location: string;
  post_image: string;
  profile_picture: string;
  participation_picture?: string;
}

const Archive = () => {
  const [events, setEvents] = useState<PastEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log('Fetching past events...');
        const data = await archiveService.getPastEvents();
        console.log('Received data:', data);
        
        // Check if data is an array
        if (!Array.isArray(data)) {
          console.error('Received non-array data:', data);
          throw new Error('Invalid response format');
        }
        
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Detailed error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load past events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
      <Box display="flex" flexDirection="column" alignItems="center" minHeight="80vh" gap={2}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
        <Typography color="text.secondary">
          Please try refreshing the page or contact support if the issue persists.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Past Participations
      </Typography>
      <Grid container spacing={3}>
        {events.length === 0 ? (
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="body1" color="text.secondary">
                No past participations yet
              </Typography>
            </Paper>
          </Grid>
        ) : (
          events.map((event) => (
            <Grid item xs={12} key={event.id}>
              <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                  <Box
                    component="img"
                    src={getImageUrl(event.post_image)}
                    alt={event.name}
                    sx={{
                      width: { xs: '100%', md: '300px' },
                      height: { xs: '200px', md: 'auto' },
                      objectFit: 'cover',
                    }}
                  />
                  <Box sx={{ p: 3, flex: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {event.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {new Date(event.time).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {event.description}
                    </Typography>
                    {event.participation_picture && (
                      <Box
                        component="img"
                        src={getImageUrl(event.participation_picture)}
                        alt="Participation"
                        sx={{
                          width: '100%',
                          maxHeight: 200,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mt: 2,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Archive; 