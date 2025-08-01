import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LocationOn, CalendarToday } from '@mui/icons-material';
import { opportunityService } from '../services/api';

interface Opportunity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organization: string;
  image_url: string;
}

interface FeedProps {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  locationFilter?: string;
  dateFilter?: string;
}

const Feed: React.FC<FeedProps> = ({ 
  sortBy, 
  sortOrder = 'asc', 
  locationFilter = '', 
  dateFilter = '' 
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  // Use useMemo to filter and sort opportunities
  const filteredAndSortedOpportunities = useMemo(() => {
    let filtered = [...opportunities];

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(opportunity =>
        opportunity.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(opportunity => {
        const opportunityDate = new Date(opportunity.date);
        return opportunityDate.toDateString() === filterDate.toDateString();
      });
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue: string;
        let bValue: string;

        if (sortBy === 'title') {
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
        } else if (sortBy === 'organization') {
          aValue = a.organization.toLowerCase();
          bValue = b.organization.toLowerCase();
        } else {
          return 0;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [opportunities, sortBy, sortOrder, locationFilter, dateFilter]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isMobile ? 0 : 4,
      width: '100%',
    }}>
      {filteredAndSortedOpportunities.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No opportunities found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search criteria
          </Typography>
        </Box>
      ) : (
        filteredAndSortedOpportunities.map((opportunity) => (
          <Box
            key={opportunity.id}
            component={isMobile ? 'div' : Paper}
            elevation={isMobile ? 0 : 1}
            sx={{
              width: '100%',
              borderBottom: isMobile ? '1px solid' : 'none',
              borderColor: 'divider',
              pb: isMobile ? 2 : 0,
              borderRadius: isMobile ? 0 : 1,
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={opportunity.image_url}
              alt={opportunity.title}
              sx={{
                width: '100%',
                height: { xs: '250px', sm: '300px', md: '400px' },
                objectFit: 'cover',
              }}
            />
            <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar 
                  src={opportunity.image_url} 
                  sx={{ mr: 1 }}
                >
                  {opportunity.organization[0]}
                </Avatar>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          </Box>
        ))
      )}
    </Box>
  );
};

export default Feed; 