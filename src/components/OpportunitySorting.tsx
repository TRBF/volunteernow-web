import React from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Sort as SortIcon,
  CalendarToday,
  Search,
} from '@mui/icons-material';

interface OpportunitySortingProps {
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onLocationFilterChange: (location: string) => void;
  onDateFilterChange: (date: string) => void;
  currentSort: {
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  locationFilter: string;
  dateFilter: string;
}

const OpportunitySorting: React.FC<OpportunitySortingProps> = ({
  onSortChange,
  onLocationFilterChange,
  onDateFilterChange,
  currentSort,
  locationFilter,
  dateFilter,
}) => {
  const handleSortByChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value, currentSort.sortOrder);
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    onSortChange(currentSort.sortBy, event.target.value as 'asc' | 'desc');
  };

  const toggleSortOrder = () => {
    const newOrder = currentSort.sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(currentSort.sortBy, newOrder);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onLocationFilterChange(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateFilterChange(event.target.value);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        mb: 2,
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SortIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6">Filter & Sort Opportunities</Typography>
      </Box>
      
      <Stack direction="column" spacing={2}>
        {/* Location Search */}
        <TextField
          fullWidth
          size="small"
          label="Search by location"
          value={locationFilter}
          onChange={handleLocationChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          placeholder="Enter location..."
        />

        {/* Date Filter */}
        <TextField
          fullWidth
          size="small"
          label="Filter by deadline"
          type="date"
          value={dateFilter}
          onChange={handleDateChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Sort Options */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort by</InputLabel>
            <Select
              value={currentSort.sortBy}
              label="Sort by"
              onChange={handleSortByChange}
            >
              <MenuItem value="title">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">Title</Typography>
                </Box>
              </MenuItem>
              <MenuItem value="organization">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2">Organization</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Order</InputLabel>
            <Select
              value={currentSort.sortOrder}
              label="Order"
              onChange={handleSortOrderChange}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {(currentSort.sortBy || locationFilter || dateFilter) && (
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {currentSort.sortBy && (
              <Chip
                label={`Sorted by ${currentSort.sortBy === 'title' ? 'Title' : 'Organization'} (${currentSort.sortOrder === 'asc' ? 'A-Z' : 'Z-A'})`}
                color="primary"
                variant="outlined"
                onClick={toggleSortOrder}
                sx={{ cursor: 'pointer' }}
              />
            )}
            {locationFilter && (
              <Chip
                label={`Location: ${locationFilter}`}
                color="secondary"
                variant="outlined"
                onDelete={() => onLocationFilterChange('')}
              />
            )}
            {dateFilter && (
              <Chip
                label={`Deadline: ${new Date(dateFilter).toLocaleDateString()}`}
                color="secondary"
                variant="outlined"
                onDelete={() => onDateFilterChange('')}
              />
            )}
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default OpportunitySorting; 