import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';

const drawerWidth = {
  xs: 0,
  sm: 240,
  md: 280
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth.sm, md: drawerWidth.md },
          flexShrink: { sm: 0 }
        }}
        aria-label="mailbox folders"
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth.sm}px)`, md: `calc(100% - ${drawerWidth.md}px)` },
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 1, sm: 2 },
          maxWidth: '100%'
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            height: '100%',
            py: 1
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
} 