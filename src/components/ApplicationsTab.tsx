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
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
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

const ApplicationsTab = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await applicationService.getUserApplications();
      setApplications(data);
    } catch (error) {
      console.error('Failed to load applications:', error);
      setError(error instanceof Error ? error.message : 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (application: Application) => {
    setSelectedApplication(application);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedApplication(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  const renderAnswer = (answer: ApplicationAnswerResponse) => {
    const date = parse(answer.answer, 'yyyy-MM-dd', new Date());
    if (isValid(date)) {
      return format(date, 'MMMM d, yyyy');
    }
    return answer.answer;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (applications.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="body1" color="text.secondary">
          No applications yet
        </Typography>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box>
        <Stack spacing={2}>
          {applications.map((application) => (
            <Card key={application.id} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {application.opportunity_title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    color={getStatusColor(application.status) as any}
                    size="small"
                    sx={{
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Applied on: {new Date(application.submitted_at).toLocaleDateString()}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenDialog(application)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    mt: 1,
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <StyledDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              p: { xs: 1, sm: 2 },
            }
          }}
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
              <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
                <Button 
                  onClick={handleCloseDialog}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3,
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </StyledDialog>
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
              <TableCell>Applied On</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Typography variant="body1">
                    {application.opportunity_title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    color={getStatusColor(application.status) as any}
                    size="small"
                    sx={{
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(application.submitted_at).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenDialog(application)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                    }}
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
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 1, sm: 2 },
          }
        }}
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
            <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
              <Button 
                onClick={handleCloseDialog}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                }}
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