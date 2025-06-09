import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  Snackbar,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { opportunityService } from '../services/api';

const Apply = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        if (!id) {
          throw new Error('Opportunity ID is required');
        }
        const data = await opportunityService.getOpportunityById(id);
        setOpportunity(data);
      } catch (err) {
        console.error('Error fetching opportunity:', err);
        setError('Failed to load opportunity details');
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id]);

  const handleCopyLink = () => {
    const applicationLink = `${window.location.origin}/opportunity/${id}/apply`;
    navigator.clipboard.writeText(applicationLink);
    setSnackbarOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !opportunity) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Opportunity not found'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Application Link for {opportunity.title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Share this link with potential volunteers to allow them to apply directly for this opportunity.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            value={`${window.location.origin}/opportunity/${id}/apply`}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleCopyLink} edge="end">
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" color="text.secondary">
            When someone clicks this link, they will be taken directly to the application form for this opportunity.
            If they don't have an account, they will be prompted to create one.
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Application link copied to clipboard"
      />
    </Container>
  );
};

export default Apply; 