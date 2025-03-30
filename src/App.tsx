import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { authService } from './services/api';
import BackgroundPattern from './components/BackgroundPattern';
import { CircularProgress, Box, Fade } from '@mui/material';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const OpportunityDetails = React.lazy(() => import('./pages/OpportunityDetails'));
const Experience = React.lazy(() => import('./pages/Experience'));
const Callouts = React.lazy(() => import('./pages/Callouts'));
const Applications = React.lazy(() => import('./pages/Applications'));
const Archive = React.lazy(() => import('./pages/Archive'));

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        ml: '280px', // Match the expanded sidebar width
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        p: 3,
      }}
    >
      <Fade in={true} timeout={300} key={location.pathname}>
        <Box>
          {children}
        </Box>
      </Fade>
    </Box>
  );
};

const PrivateLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header showSearch={true} />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/opportunity/:id" element={<OpportunityDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/callouts" element={<Callouts />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </MainContent>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundPattern />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/login" element={
            <Fade in={true} timeout={300}>
              <Box>
                <Login />
              </Box>
            </Fade>
          } />
          <Route path="/register" element={
            <Fade in={true} timeout={300}>
              <Box>
                <SignUp />
              </Box>
            </Fade>
          } />
          <Route path="/*" element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          } />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
