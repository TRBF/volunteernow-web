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
} from '@mui/material';
import {
  Search as SearchIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { archiveService } from '../services/api';

interface PastEvent {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  date: string;
  location: string;
  description: string;
  impact: string;
  participants: number;
  rating: number;
  images: string[];
  tags: string[];
}

const Archive: React.FC = () => {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<PastEvent[]>([]);

  useEffect(() => {
    loadPastEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, pastEvents]);

  const loadPastEvents = async () => {
    try {
      const data = await archiveService.getPastEvents();
      setPastEvents(data);
    } catch (error) {
      console.error('Failed to load past events:', error);
    }
  };

  const filterEvents = () => {
    const query = searchQuery.toLowerCase();
    const filtered = pastEvents.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.organization.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.tags.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredEvents(filtered);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Past Events Archive
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse through our history of successful volunteer events and their impact.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search past events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={event.organizationLogo}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  >
                    {event.organization[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {event.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {event.organization}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {event.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      {event.participants} volunteers
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body1" paragraph>
                  {event.description}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Impact:
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  {event.impact}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Rating value={event.rating} readOnly precision={0.5} />
                </Box>

                <Box sx={{ mb: 2 }}>
                  {event.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                {event.images.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                    {event.images.map((image, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={image}
                        alt={`Event photo ${index + 1}`}
                        sx={{
                          width: 120,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No past events found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Archive; 