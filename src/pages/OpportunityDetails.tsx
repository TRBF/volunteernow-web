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
import { opportunityService, authService, commentService } from '../services/api';
import { applicationService } from '../services/applicationService';
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';
import Comment from '../components/Comment';

// Helper function to get full media URL
const getMediaUrl = (path: string | null) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `https://api.volunteernow.eu${path}`;
};

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
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [noApplicationForm, setNoApplicationForm] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  const currentUserId = localStorage.getItem('user_id') || undefined;

  useEffect(() => {
    if (id) {
      fetchOpportunityDetails(id);
      fetchComments(id);
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

  const fetchComments = async (opportunityId: string) => {
    setCommentsLoading(true);
    try {
      console.log('Fetching comments for opportunity:', opportunityId);
      const data = await commentService.getOpportunityComments(opportunityId);
      console.log('Comments fetched successfully:', data);
      setComments(data);
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      }
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !id) return;

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to post comments.');
      return;
    }

    setSubmittingComment(true);
    try {
      console.log('Submitting comment:', { opportunityId: id, content: comment });
      const result = await commentService.addComment(id, comment);
      console.log('Comment submitted successfully:', result);
      setComment('');
      // Refresh comments
      await fetchComments(id);
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        if (err.response.status === 401) {
          alert('Please log in to post comments.');
        } else if (err.response.status === 400) {
          alert('Invalid comment data. Please try again.');
        } else {
          alert(`Failed to submit comment: ${err.response.data?.error || 'Unknown error'}`);
        }
      } else {
        alert('Failed to submit comment. Please try again.');
      }
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleCommentUpdated = () => {
    if (id) {
      fetchComments(id);
    }
  };

  const handleCommentDeleted = () => {
    if (id) {
      fetchComments(id);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setSnackbarOpen(true);
  };

  const handleSignUp = async () => {
    if (!opportunity) return;
    if (opportunity.external_application_url) {
      window.open(opportunity.external_application_url, '_blank');
      return;
    }
    try {
      const questions = await applicationService.getApplicationForm(Number(opportunity.id));
      if (questions && questions.length > 0) {
        setIsApplicationFormOpen(true);
        setNoApplicationForm(false);
      } else {
        setNoApplicationForm(true);
      }
    } catch (err) {
      setNoApplicationForm(true);
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
                        <Avatar src={getMediaUrl(participant.profile_picture)} />
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
                    disabled={noApplicationForm}
                  >
                    Apply Now
                  </Button>
                  {noApplicationForm && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      No application form is available for this opportunity.
                    </Alert>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Comments ({comments.length})
                  </Typography>
                  
                  {commentsLoading ? (
                    <Box display="flex" justifyContent="center" py={2}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 2 }}>
                      {comments.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                          No comments yet. Be the first to comment!
                        </Typography>
                      ) : (
                        comments.map((comment) => (
                          <Comment
                            key={comment.id}
                            comment={comment}
                            currentUserId={currentUserId}
                            onCommentUpdated={handleCommentUpdated}
                            onCommentDeleted={handleCommentDeleted}
                          />
                        ))
                      )}
                    </Box>
                  )}

                  {currentUserId ? (
                    <Box component="form" onSubmit={handleCommentSubmit}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ mb: 2 }}
                        disabled={submittingComment}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={!comment.trim() || submittingComment}
                      >
                        {submittingComment ? 'Posting...' : 'Post Comment'}
                      </Button>
                    </Box>
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Please log in to post comments.
                    </Alert>
                  )}
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

      <ApplicationForm
        open={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        opportunityId={Number(opportunity.id)}
        opportunityTitle={opportunity.title}
      />
    </motion.div>
  );
};

export default OpportunityDetails; 