import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Dot from './Dot';

const DotDemo: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dot Pattern Demo (#8027ab)
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Main Pattern (#8027ab, 60% opacity)
            </Typography>
            <Dot
              color="rgba(128, 39, 171, 0.6)"
              size={1}
              spacing={15}
              style={{ height: '150px', borderRadius: '8px' }}
            >
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography>Main dots (#8027ab, 0.6 opacity)</Typography>
              </Box>
            </Dot>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Secondary Pattern (#8027ab, 60% opacity)
            </Typography>
            <Dot
              color="rgba(128, 39, 171, 0.6)"
              size={1}
              spacing={30}
              style={{ height: '150px', borderRadius: '8px' }}
            >
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography>Secondary dots (#8027ab, 0.6 opacity)</Typography>
              </Box>
            </Dot>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              High Visibility Pattern
            </Typography>
            <Dot
              color="rgba(128, 39, 171, 0.8)"
              size={1}
              spacing={8}
              style={{ height: '150px', borderRadius: '8px' }}
            >
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography>High visibility dots</Typography>
              </Box>
            </Dot>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 200 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Light Pattern
            </Typography>
            <Dot
              color="rgba(128, 39, 171, 0.4)"
              size={1}
              spacing={20}
              style={{ height: '150px', borderRadius: '8px' }}
            >
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography>Light dots (0.4 opacity)</Typography>
              </Box>
            </Dot>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DotDemo; 