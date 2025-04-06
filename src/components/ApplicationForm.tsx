import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { applicationService } from '../services/applicationService';
import { ApplicationQuestion, ApplicationAnswerSubmission, ApplicationError } from '../types/application';

interface ApplicationFormProps {
  open: boolean;
  onClose: () => void;
  opportunityId: number;
  opportunityTitle: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  open,
  onClose,
  opportunityId,
  opportunityTitle,
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ApplicationError | null>(null);
  const [success, setSuccess] = useState(false);
  const [questions, setQuestions] = useState<ApplicationQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadApplicationForm();
    }
  }, [open, opportunityId]);

  useEffect(() => {
    if (open) {
      setAnswers({});
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const loadApplicationForm = async () => {
    setIsLoading(true);
    try {
      const formQuestions = await applicationService.getApplicationForm(opportunityId);
      setQuestions(formQuestions);
    } catch (err) {
      console.error('[ApplicationForm] Failed to load application form:', err);
      // Default to basic motivation question if can't load custom questions
      setQuestions([{
        id: 0,
        opportunity: opportunityId,
        question_text: 'Why are you interested in this opportunity?',
        question_type: 'textarea',
        is_required: true,
        order: 0
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionId: number, value: string | Date | null | string[]) => {
    const formattedValue = value instanceof Date 
      ? value.toISOString().split('T')[0] 
      : Array.isArray(value) 
        ? JSON.stringify(value) 
        : value as string;
    
    setAnswers(prev => ({
      ...prev,
      [questionId]: formattedValue || ''
    }));
  };

  const isFormValid = () => {
    return questions.every(question => 
      !question.is_required || (answers[question.id] && answers[question.id].trim() !== '')
    );
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const formattedAnswers: ApplicationAnswerSubmission[] = Object.entries(answers).map(([questionId, answer]) => ({
        question: parseInt(questionId),
        answer: answer
      }));

      await applicationService.submitApplication(opportunityId, formattedAnswers);
      
      setSuccess(true);
      onClose();
    } catch (err) {
      const appError = err as ApplicationError;
      setError(appError);
      console.error('[ApplicationForm] Error submitting application:', appError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = (questionType: string) => {
    switch (questionType) {
      case 'text':
        return 'Type your answer here...';
      case 'textarea':
        return 'Write your detailed response here...';
      case 'number':
        return 'Enter a number...';
      case 'date':
        return 'Select a date...';
      case 'select':
        return 'Select an option...';
      case 'checkbox':
        return 'Select one or more options...';
      default:
        return 'Enter your answer...';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 2,
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          Apply for {opportunityTitle}
        </Typography>
      </DialogTitle>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
              {error.details && (
                <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
                  {Array.isArray(error.details) && error.details.map((detail, index) => (
                    <li key={index}>{detail.message}</li>
                  ))}
                </Box>
              )}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Application submitted successfully!
            </Alert>
          )}

          {isLoading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {questions.map((question) => (
                <Box key={question.id} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                    {question.question_text}
                    {question.is_required && ' *'}
                  </Typography>
                  
                  {question.question_type === 'date' ? (
                    <DatePicker
                      value={answers[question.id] ? new Date(answers[question.id]) : null}
                      onChange={(newValue) => handleAnswerChange(question.id, newValue)}
                      disabled={isSubmitting}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: question.is_required,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            }
                          }
                        }
                      }}
                    />
                  ) : question.question_type === 'select' ? (
                    <FormControl 
                      fullWidth 
                      required={question.is_required}
                      disabled={isSubmitting}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    >
                      <InputLabel id={`select-label-${question.id}`}>Select an option</InputLabel>
                      <Select
                        labelId={`select-label-${question.id}`}
                        value={answers[question.id] || ''}
                        label="Select an option"
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      >
                        {question.options?.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {question.is_required && !answers[question.id] && (
                        <FormHelperText error>This field is required</FormHelperText>
                      )}
                    </FormControl>
                  ) : question.question_type === 'checkbox' ? (
                    <FormGroup>
                      {question.options?.map((option, index) => {
                        const currentAnswers = answers[question.id] 
                          ? JSON.parse(answers[question.id]) as string[] 
                          : [];
                        
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={currentAnswers.includes(option)}
                                onChange={(e) => {
                                  const newAnswers = e.target.checked
                                    ? [...currentAnswers, option]
                                    : currentAnswers.filter(item => item !== option);
                                  handleAnswerChange(question.id, newAnswers);
                                }}
                                disabled={isSubmitting}
                              />
                            }
                            label={option}
                          />
                        );
                      })}
                      {question.is_required && (!answers[question.id] || JSON.parse(answers[question.id]).length === 0) && (
                        <FormHelperText error>Please select at least one option</FormHelperText>
                      )}
                    </FormGroup>
                  ) : (
                    <TextField
                      fullWidth
                      multiline={question.question_type === 'textarea'}
                      rows={question.question_type === 'textarea' ? 4 : 1}
                      type={question.question_type === 'number' ? 'number' : 'text'}
                      placeholder={getPlaceholder(question.question_type)}
                      value={answers[question.id] || ''}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      disabled={isSubmitting}
                      required={question.is_required}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  )}
                </Box>
              ))}
            </LocalizationProvider>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting || isLoading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isLoading || !isFormValid()}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Submit Application'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ApplicationForm; 