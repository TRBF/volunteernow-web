import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  FormLabel,
} from '@mui/material';
import { applicationService } from '../services/applicationService';
import { Application, ApplicationAnswerResponse } from '../types/application';
import { format, isValid, parse } from 'date-fns';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

const ReadOnlyTextField = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
    color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#f8f9fa',
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    '& > fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
});

const QuestionLabel = styled(FormLabel)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  fontWeight: 500,
}));

const AnswerBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ApplicationsTab: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug: Check if token exists
      const token = localStorage.getItem('token');
      console.log('[ApplicationsTab] Token exists:', !!token);
      
      // Debug: Check if user is logged in
      const userId = localStorage.getItem('user_id');
      console.log('[ApplicationsTab] User ID:', userId);
      
      const userApplications = await applicationService.getUserApplications();
      console.log('[ApplicationsTab] Applications received:', userApplications);
      
      setApplications(userApplications);
    } catch (err) {
      console.error('[ApplicationsTab] Failed to load applications:', err);
      setError('Failed to load applications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedApplication(null);
  };

  const renderAnswer = (answer: ApplicationAnswerResponse) => {
    // Try to detect the answer type
    const isDate = (str: string) => {
      const parsed = parse(str, 'yyyy-MM-dd', new Date());
      return isValid(parsed);
    };

    const isCheckbox = (str: string) => {
      return str === 'true' || str === 'false' || str === '["Yes"]' || str === '["No"]';
    };

    const isNumber = (str: string) => {
      return !isNaN(Number(str));
    };

    if (isDate(answer.answer)) {
      const date = parse(answer.answer, 'yyyy-MM-dd', new Date());
      return (
        <ReadOnlyTextField
          fullWidth
          value={format(date, 'MMMM d, yyyy')}
          disabled
          variant="outlined"
          size="small"
        />
      );
    }

    if (isCheckbox(answer.answer)) {
      const value = answer.answer === 'true' || answer.answer === '["Yes"]' ? 'Yes' : 'No';
      return (
        <ReadOnlyTextField
          fullWidth
          value={value}
          disabled
          variant="outlined"
          size="small"
        />
      );
    }

    if (isNumber(answer.answer)) {
      return (
        <ReadOnlyTextField
          fullWidth
          value={answer.answer}
          disabled
          variant="outlined"
          size="small"
        />
      );
    }

    // Default to text/textarea
    return (
      <ReadOnlyTextField
        fullWidth
        multiline={answer.answer.length > 50}
        rows={answer.answer.length > 50 ? 3 : 1}
        value={answer.answer}
        disabled
        variant="outlined"
        size="small"
      />
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (applications.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="text.secondary">
          You haven't submitted any applications yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Opportunity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.opportunity_title}</TableCell>
                <TableCell>
                  <Chip
                    label={application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    color={getStatusColor(application.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {format(new Date(application.submitted_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  {format(new Date(application.updated_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDetails(application)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StyledDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Typography variant="h6">Application Details</Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {selectedApplication.opportunity_title}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Chip
                    label={selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                    color={getStatusColor(selectedApplication.status) as any}
                    size="small"
                    sx={{
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 500,
                    mb: 2
                  }}
                >
                  Your Answers
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                }}>
                  {selectedApplication.answers.map((answer, index) => (
                    <AnswerBox key={index}>
                      <QuestionLabel>
                        {answer.question_text}
                      </QuestionLabel>
                      {renderAnswer(answer)}
                    </AnswerBox>
                  ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
              <Button 
                onClick={handleCloseDialog}
                variant="outlined"
                size="small"
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </StyledDialog>
    </Box>
  );
};

export default ApplicationsTab; 