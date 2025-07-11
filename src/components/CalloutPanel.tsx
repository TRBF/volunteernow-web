import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { calloutsService } from '../services/api';

interface Callout {
  id: number;
  title: string;
  description: string;
  organization: string;
  organizationLogo?: string;
  calloutPicture?: string;
  opportunity?: {
    id: number;
    name: string;
  };
  time?: string;
}

const CalloutPanel = () => {
  const navigate = useNavigate();
  const [callouts, setCallouts] = useState<Callout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCallouts();
  }, []);

  const fetchCallouts = async () => {
    try {
      setLoading(true);
      const data = await calloutsService.getCallouts();
      setCallouts(data);
    } catch (error) {
      console.error('Error fetching callouts:', error);
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
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 2,
        mb: 2,
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CampaignIcon sx={{ mr: 2 }} />
            <Typography variant="h6">New Callouts</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ overflowY: 'auto', flex: 1, px: 3 }}>
        <List sx={{ '& .MuiListItem-root': { mb: 2 } }}>
          {callouts.length > 0 ? (
            callouts.map((callout) => (
              <React.Fragment key={callout.id}>
                <ListItem
                  onClick={() => handleCalloutClick(callout)}
                  sx={{
                    borderRadius: 1,
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={callout.calloutPicture || callout.organizationLogo} 
                      alt={callout.title}
                    >
                      <CampaignIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={callout.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {callout.organization}
                        </Typography>
                        {" — " + callout.description.substring(0, 60) + (callout.description.length > 60 ? "..." : "")}
                        {callout.time && (
                          <Typography component="div" variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                            {new Date(callout.time).toLocaleDateString()}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
                <Divider sx={{ my: 2 }} />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No new callouts available.
            </Typography>
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default CalloutPanel; 