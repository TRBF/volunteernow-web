import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import Feed from '../components/Feed';
import CalloutPanel from '../components/CalloutPanel';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
            ml: { xs: 0, sm: '72px', md: '240px' }, // Responsive sidebar spacing
            display: 'flex',
            justifyContent: 'center',
            py: 3,
            width: { xs: '100%', sm: `calc(100% - 72px)`, md: `calc(100% - 240px)` },
          }}
        >
          <Container 
            maxWidth={false}
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: '1024px',
              gap: { xs: 3, md: 4 },
              px: { xs: 1, sm: 2 },
            }}
          >
            <Box 
              sx={{ 
                width: { xs: '100%', md: '60%' },
                maxWidth: { md: '630px' },
                flexShrink: 0,
              }}
            >
              <Feed />
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
            </Box>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Home; 