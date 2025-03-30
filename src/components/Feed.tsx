import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { Business, LocationOn, CalendarToday, Favorite, FavoriteBorder } from '@mui/icons-material';
import { opportunityService } from '../services/api';

interface Opportunity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organization: string;
  image_url: string;
  likes: number;
}

const Feed = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const data = await opportunityService.getOpportunities();
      setOpportunities(data);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (opportunityId: number) => {
    try {
      await opportunityService.likeOpportunity(opportunityId.toString());
      setOpportunities(prev =>
        prev.map(opportunity =>
          opportunity.id === opportunityId
            ? { ...opportunity, likes: opportunity.likes + 1 }
            : opportunity
        )
      );
    } catch (error) {
      console.error('Error liking opportunity:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {opportunities.map((opportunity) => (
        <Paper
          key={opportunity.id}
          elevation={0}
          sx={{
            width: '100%',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={opportunity.image_url}
            alt={opportunity.title}
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
            }}
          />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Avatar sx={{ mr: 1 }}>{opportunity.organization[0]}</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {opportunity.organization}
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              {opportunity.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                icon={<LocationOn />}
                label={opportunity.location}
                size="small"
                sx={{ borderRadius: 1 }}
              />
              <Chip
                icon={<CalendarToday />}
                label={new Date(opportunity.date).toLocaleDateString()}
                size="small"
                sx={{ borderRadius: 1 }}
              />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                whiteSpace: 'pre-wrap',
              }}
            >
              {opportunity.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={() => handleLike(opportunity.id)}>
                  {opportunity.likes > 0 ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
                <Typography variant="body2">{opportunity.likes || 0}</Typography>
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate(`/opportunity/${opportunity.id}`)}
                sx={{ borderRadius: 1 }}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Feed; 