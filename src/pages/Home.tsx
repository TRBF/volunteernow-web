import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import Feed from '../components/Feed';
import CalloutPanel from '../components/CalloutPanel';
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
            ml: '240px', // Space for sidebar
            display: 'flex',
            justifyContent: 'center',
            py: 3,
          }}
        >
          <Container 
            maxWidth={false}
            sx={{ 
              display: 'flex',
              maxWidth: '1024px', // Instagram-like max width
              gap: 8, // Increased from 3 to 8 for more spacing
              px: 2,
            }}
          >
            <Box 
              sx={{ 
                width: '630px', // Instagram feed width
                flexShrink: 0,
              }}
            >
              <Feed />
            </Box>
            <Box 
              sx={{ 
                width: '320px', // Instagram sidebar width
                flexShrink: 0,
                position: 'sticky',
                top: 24,
                height: 'fit-content',
                display: { xs: 'none', md: 'block' }, // Hide on mobile
              }}
            >
              <CalloutPanel />
            </Box>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Home; 