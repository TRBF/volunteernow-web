import React, { useState } from 'react';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import Feed from '../components/Feed';
import CalloutPanel from '../components/CalloutPanel';
import OpportunitySorting from '../components/OpportunitySorting';

const Home = () => {
  const [sortConfig, setSortConfig] = useState({
    sortBy: '',
    sortOrder: 'asc' as 'asc' | 'desc',
  });
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setSortConfig({ sortBy, sortOrder });
  };

  const handleLocationFilterChange = (location: string) => {
    setLocationFilter(location);
  };

  const handleDateFilterChange = (date: string) => {
    setDateFilter(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            ml: { xs: 0, sm: '72px', md: '240px' },
            display: 'flex',
            justifyContent: 'center',
            py: { xs: 0, sm: 3 },
            width: { xs: '100%', sm: `calc(100% - 72px)`, md: `calc(100% - 240px)` },
          }}
        >
          <Container 
            maxWidth={false}
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: '1024px',
              gap: { xs: 0, md: 4 },
              px: { xs: 0, sm: 2 },
              width: '100%',
            }}
          >
            <Box 
              sx={{ 
                width: { xs: '100%', md: '60%' },
                maxWidth: { md: '630px' },
                flexShrink: 0,
              }}
            >
              <Feed 
                sortBy={sortConfig.sortBy} 
                sortOrder={sortConfig.sortOrder}
                locationFilter={locationFilter}
                dateFilter={dateFilter}
              />
            </Box>
            <Box 
              sx={{ 
                width: { xs: '100%', md: '40%' },
                maxWidth: { md: '320px' },
                flexShrink: 0,
                position: { xs: 'static', md: 'sticky' },
                top: 24,
                height: 'fit-content',
                display: { xs: isTablet ? 'block' : 'none', md: 'block' },
              }}
            >
              <CalloutPanel />
              <OpportunitySorting 
                onSortChange={handleSortChange}
                onLocationFilterChange={handleLocationFilterChange}
                onDateFilterChange={handleDateFilterChange}
                currentSort={sortConfig}
                locationFilter={locationFilter}
                dateFilter={dateFilter}
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Home; 