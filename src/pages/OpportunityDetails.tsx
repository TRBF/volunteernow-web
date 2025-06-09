import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  useTheme,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  Business,
  ArrowBack,
  Assignment as RequirementsIcon,
  Group as ParticipantsIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { opportunityService, authService } from '../services/api';
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  image_url: string;
  location: string;
  date: string;
  organization: string;
  requirements: string[];
  participants: {
    id: string;
    username: string;
    profile_picture: string;
  }[];
  external_application_url?: string;
}

const OpportunityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchOpportunityDetails(id);
    }
  }, [id]);

  const fetchOpportunityDetails = async (opportunityId: string) => {
    try {
      const data = await opportunityService.getOpportunityById(opportunityId);
      setOpportunity(data);
    } catch (err) {
      console.error('Error fetching opportunity details:', err);
      setError('Failed to load opportunity details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setComment('');
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  const handleSignUp = () => {
    if (!opportunity) return;

    if (opportunity.external_application_url) {
      // Open external application URL in a new tab
      window.open(opportunity.external_application_url, '_blank');
    } else {
      // Navigate to registration if no external URL is set
      navigate('/register');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !opportunity) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {error || 'Failed to load opportunity details'}
        </Alert>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mb: 2 }}
          >
            Back to Opportunities
          </Button>

          <Paper elevation={3} sx={{ p: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h4" gutterBottom>
                    {opportunity.title}
                  </Typography>
                  <Tooltip title="Share opportunity">
                    <IconButton onClick={handleShare} color="primary">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Chip
                    icon={<Business />}
                    label={opportunity.organization}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<LocationOn />}
                    label={opportunity.location}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<CalendarToday />}
                    label={new Date(opportunity.date).toLocaleDateString()}
                  />
                </Box>
                <Box
                  component="img"
                  src={opportunity.image_url}
                  alt={opportunity.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    mb: 3,
                  }}
                />
                <Typography variant="body1" paragraph>
                  {opportunity.description}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  Requirements
                </Typography>
                <List>
                  {opportunity.requirements.map((req, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={req} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  Participants
                </Typography>
                <List>
                  {opportunity.participants.map((participant) => (
                    <ListItem key={participant.id}>
                      <ListItemAvatar>
                        <Avatar src={participant.profile_picture} />
                      </ListItemAvatar>
                      <ListItemText primary={participant.username} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Join this Opportunity
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mb: 3 }}
                    onClick={handleSignUp}
                  >
                    {opportunity.external_application_url ? 'Apply Now' : 'Sign Up'}
                  </Button>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  <Box component="form" onSubmit={handleCommentSubmit}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={!comment.trim()}
                    >
                      Post Comment
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Opportunity link copied to clipboard"
      />
    </motion.div>
  );
};

export default OpportunityDetails; 