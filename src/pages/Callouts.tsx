import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Avatar,
  CircularProgress,
  useTheme,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { calloutsService, opportunityService } from '../services/api';

interface Opportunity {
  id: string;
  name: string;
  title: string;
}

interface Callout {
  id: string;
  title: string;
  organization: string;
  description: string;
  organizationLogo?: string;
  calloutPicture?: string;
  opportunity?: {
    id: string;
    name: string;
  };
  opportunityDetails?: Opportunity;
}

const Callouts: React.FC = () => {
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    loadCallouts();
  }, []);

  const loadCallouts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await calloutsService.getCallouts();
      
      // Fetch opportunity details for each callout
      const calloutsWithOpportunities = await Promise.all(
        data.map(async (callout: Callout) => {
          if (callout.opportunity?.id) {
            try {
              const opportunityDetails = await opportunityService.getOpportunityById(callout.opportunity.id.toString());
              return {
                ...callout,
                opportunityDetails
              };
            } catch (error) {
              console.error(`Failed to fetch opportunity details for ID ${callout.opportunity.id}:`, error);
              return callout;
            }
          }
          return callout;
        })
      );
      
      setCallouts(calloutsWithOpportunities);
    } catch (error) {
      console.error('Failed to load callouts:', error);
      setError('Failed to load callouts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCalloutClick = (callout: Callout) => {
    if (callout.opportunity?.id) {
      navigate(`/opportunity/${callout.opportunity.id}`);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={loadCallouts}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>      {callouts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
          No updates available at the moment.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {callouts.map((callout) => (
            <Card 
              key={callout.id}
              onClick={() => handleCalloutClick(callout)}
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                }
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={callout.organizationLogo}
                        sx={{ width: 40, height: 40, mr: 2 }}
                      >
                        {callout.organization[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="div">
                          {callout.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {callout.organization}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {callout.description}
                    </Typography>

                    {callout.opportunity && (
                      <Typography variant="body2" color="primary">
                        View Opportunity: {callout.opportunityDetails?.title || 'Loading...'}
                      </Typography>
                    )}
                  </CardContent>
                </Box>
                {callout.calloutPicture && (
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      margin: 2,
                      backgroundImage: `url(${callout.calloutPicture})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 2,
                      boxShadow: theme.shadows[1],
                    }}
                  />
                )}
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Callouts; 