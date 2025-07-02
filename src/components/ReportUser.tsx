import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { reportService } from '../services/api';

interface ReportUserProps {
  open: boolean;
  onClose: () => void;
  reportedUserId: number;
  reportedUsername: string;
}

const REPORT_TYPES = [
  { value: 'inappropriate_content', label: 'Inappropriate Content' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'spam', label: 'Spam' },
  { value: 'fake_profile', label: 'Fake Profile' },
  { value: 'other', label: 'Other' },
];

export const ReportUser: React.FC<ReportUserProps> = ({
  open,
  onClose,
  reportedUserId,
  reportedUsername,
}) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!reportType || !description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await reportService.reportUser(reportedUserId, reportType, description);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setReportType('');
        setDescription('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setReportType('');
      setDescription('');
      setError('');
      setSuccess(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report User</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          You are reporting <strong>{reportedUsername || 'this user'}</strong>
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Report submitted successfully. Thank you for helping keep our community safe.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Report Type</InputLabel>
          <Select
            value={reportType}
            label="Report Type"
            onChange={(e) => setReportType(e.target.value)}
            disabled={loading}
          >
            {REPORT_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please provide details about the issue..."
          disabled={loading}
          sx={{ mb: 2 }}
        />

        <Typography variant="caption" color="text.secondary">
          Your report will be reviewed by our moderation team. False reports may result in account restrictions.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={loading || !reportType || !description.trim()}
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 