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
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { reportService } from '../services/api';

interface Report {
  id: number;
  reporter: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  reported_user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  report_type: string;
  description: string;
  status: string;
  created_at: string;
}

const REPORT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'investigating', label: 'Investigating', color: 'info' },
  { value: 'resolved', label: 'Resolved', color: 'success' },
  { value: 'dismissed', label: 'Dismissed', color: 'error' },
];

const REPORT_TYPES = {
  inappropriate_content: 'Inappropriate Content',
  harassment: 'Harassment',
  spam: 'Spam',
  fake_profile: 'Fake Profile',
  other: 'Other',
};

export const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportService.getUserReports();
      setReports(data);
    } catch (err) {
      setError('Failed to fetch reports');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedReport || !newStatus) return;

    setUpdating(true);
    try {
      await reportService.updateReportStatus(selectedReport.id, newStatus);
      setReports(reports.map(report => 
        report.id === selectedReport.id 
          ? { ...report, status: newStatus }
          : report
      ));
      setStatusDialogOpen(false);
      setSelectedReport(null);
      setNewStatus('');
    } catch (err) {
      setError('Failed to update report status');
      console.error('Error updating report status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Reports
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell>Reported User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{formatDate(report.created_at)}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {report.reporter.first_name} {report.reporter.last_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @{report.reporter.username}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {report.reported_user.first_name} {report.reported_user.last_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @{report.reported_user.username}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={REPORT_TYPES[report.report_type as keyof typeof REPORT_TYPES] || report.report_type}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {report.description.length > 100 
                      ? `${report.description.substring(0, 100)}...`
                      : report.description
                    }
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={REPORT_STATUSES.find(s => s.value === report.status)?.label || report.status}
                    color={REPORT_STATUSES.find(s => s.value === report.status)?.color as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setSelectedReport(report);
                      setNewStatus(report.status);
                      setStatusDialogOpen(true);
                    }}
                  >
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Update Report Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Report by {selectedReport?.reporter.username} against {selectedReport?.reported_user.username}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Description:</strong> {selectedReport?.description}
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newStatus}
              label="Status"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {REPORT_STATUSES.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusUpdate}
            variant="contained"
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 