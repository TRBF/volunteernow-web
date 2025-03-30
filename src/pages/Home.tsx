import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import Feed from '../components/Feed';
import NotificationsPanel from '../components/NotificationsPanel';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = async (query: string) => {
    setSearchQuery(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            ml: { xs: 0, md: '240px' }, // Space for sidebar on desktop only
            display: 'flex',
            justifyContent: 'center',
            py: { xs: 2, md: 3 },
          }}
        >
          <Container 
            maxWidth={false}
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: '1024px', // Instagram-like max width
              gap: { xs: 4, md: 8 }, // Adjust gap for different screen sizes
              px: { xs: 1, md: 2 },
            }}
          >
            <Box 
              sx={{ 
                width: { xs: '100%', md: '630px' }, // Full width on mobile
                flexShrink: 0,
              }}
            >
              <Feed />
            </Box>
            <Box 
              sx={{ 
                width: { xs: '100%', md: '320px' }, // Full width on mobile
                flexShrink: 0,
                position: { xs: 'static', md: 'sticky' },
                top: 24,
                height: 'fit-content',
                display: { xs: 'block', md: 'block' }, // Show on all devices
              }}
            >
              <NotificationsPanel />
            </Box>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Home; 