import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  useTheme,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
  AppBar,
  Toolbar,
  Drawer,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  WorkHistory as ExperienceIcon,
  Campaign as CalloutIcon,
  Description as ApplicationIcon,
  Archive as ArchiveIcon,
  ArrowBack as ArrowBackIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService, searchService } from '../services/api';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import ThemeToggleIcon from './ThemeToggleIcon';

const MEDIA_BASE_URL = 'https://api.volunteernow.ro';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`search-tabpanel-${index}`}
      aria-labelledby={`search-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  showSearch = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      // Clear all auth-related data
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      
      // Call the logout endpoint
      await authService.logout();
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the API call fails, we should still clear local data and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      navigate('/login');
    }
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setLocalSearchQuery(query);
    setSearchError(null);
    
    if (onSearchChange) {
      onSearchChange(query);
    }

    if (query.trim()) {
      setIsSearching(true);
      try {
        const results = await searchService.search(query);
        const people = results.filter((result: any) => result.type === 'user');
        setPeopleResults(people);
      } catch (err) {
        console.error('Search error:', err);
        setSearchError('Failed to fetch search results');
        setPeopleResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setPeopleResults([]);
    }
  };

  const handleSearchOpen = () => {
    setIsCollapsed(true);
    setSearchDrawerOpen(true);
  };

  const handleSearchClose = () => {
    setSearchDrawerOpen(false);
    setIsCollapsed(false);
  };

  const sidebarWidth = {
    xs: '100%',
    sm: 280,
  };

  const isActive = (path: string) => {
    if (path === '/profile') {
      return location.pathname.startsWith('/profile');
    }
    return location.pathname === path;
  };

  const handleProfileClick = () => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Home', onClick: () => navigate('/') },
    { path: '/experience', icon: ExperienceIcon, label: 'My Experience', onClick: () => navigate('/experience') },
    { path: '/callouts', icon: CalloutIcon, label: 'Callouts', onClick: () => navigate('/callouts') },
    { path: '/applications', icon: ApplicationIcon, label: 'Applications', onClick: () => navigate('/applications') },
    { path: '/profile', icon: PersonIcon, label: 'Profile', onClick: handleProfileClick },
  ];

  if (isMobile) return null;

  return (
    <>
      {!searchDrawerOpen ? (
        <Box
          sx={{
            width: {
              xs: isCollapsed ? 0 : '100%',
              sm: isCollapsed ? 72 : sidebarWidth.sm,
            },
            height: '100vh',
            position: {
              xs: 'fixed',
              sm: 'fixed',
            },
            left: 0,
            top: 0,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            p: {
              xs: isCollapsed ? 1 : 2,
              sm: isCollapsed ? 1.5 : 3,
            },
            transition: theme.transitions.create(['width', 'padding'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            zIndex: 1200,
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: { xs: 2, sm: 4 },
            pl: { xs: 0, sm: isCollapsed ? 0.5 : 0 }
          }}>
            {!isCollapsed && (
              <Button
                color="inherit"
                onClick={() => navigate('/')}
                sx={{
                  textTransform: 'none',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'none',
                  },
                  '&:active': {
                    transform: 'none',
                  },
                }}
              >
                VolunteerNow
              </Button>
            )}
            <IconButton 
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>

          <List sx={{ 
            flex: 1, 
            px: { 
              xs: isCollapsed ? 0 : 0.5,
              sm: isCollapsed ? 0 : 1 
            }
          }}>
            {showSearch && (
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={handleSearchOpen}
                  sx={{
                    borderRadius: 2,
                    minHeight: 48,
                    px: isCollapsed ? 2 : 3,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 3 }}>
                    <SearchIcon 
                      sx={{ 
                        color: searchDrawerOpen ? theme.palette.primary.main : 'text.secondary',
                        fontSize: 28,
                      }} 
                    />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText 
                      primary="Search"
                      primaryTypographyProps={{
                        color: searchDrawerOpen ? 'primary' : 'text.primary',
                        fontWeight: searchDrawerOpen ? 600 : 400,
                        sx: {
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            )}

            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={item.onClick}
                  sx={{
                    borderRadius: 2,
                    minHeight: 48,
                    px: isCollapsed ? 2 : 3,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 3 }}>
                    <item.icon
                      sx={{ 
                        color: isActive(item.path) ? theme.palette.primary.main : 'text.secondary',
                        fontSize: 28,
                      }} 
                    />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        color: isActive(item.path) ? 'primary' : 'text.primary',
                        fontWeight: isActive(item.path) ? 600 : 400,
                        sx: {
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto' }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={toggleTheme}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  px: isCollapsed ? 2 : 3,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 3 }}>
                  <ThemeToggleIcon isDarkMode={isDarkMode} />
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText 
                    primary={isDarkMode ? "Light Mode" : "Dark Mode"}
                    primaryTypographyProps={{
                      color: 'text.primary',
                      sx: {
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  px: isCollapsed ? 2 : 3,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isCollapsed ? 0 : 3 }}>
                  <LogoutIcon sx={{ color: 'text.secondary', fontSize: 28 }} />
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText 
                    primary="Logout" 
                    primaryTypographyProps={{
                      color: 'text.primary',
                      sx: {
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open={searchDrawerOpen}
          onClose={handleSearchClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '100%', sm: 400 },
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={handleSearchClose} sx={{ mr: 1 }}>
                <ArrowBackIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Search people..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {isSearching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : searchError ? (
              <Typography color="error" sx={{ p: 2, textAlign: 'center' }}>
                {searchError}
              </Typography>
            ) : (
              <List>
                {peopleResults.map((person) => (
                  <ListItem key={person.id} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/profile/${person.id}`);
                        handleSearchClose();
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={person.profile_picture} alt={person.username} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={person.name}
                        secondary={`@${person.username}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
                {peopleResults.length === 0 && localSearchQuery.trim() && (
                  <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                    No results found
                  </Typography>
                )}
              </List>
            )}
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Header; 