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
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState(1);
  const [opportunityResults, setOpportunityResults] = useState<any[]>([]);
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        const opportunities = results.filter((result: any) => result.type === 'opportunity');
        const people = results.filter((result: any) => result.type === 'user');
        
        setOpportunityResults(opportunities);
        setPeopleResults(people);
      } catch (err) {
        console.error('Search error:', err);
        setSearchError('Failed to fetch search results');
        setOpportunityResults([]);
        setPeopleResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setOpportunityResults([]);
      setPeopleResults([]);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
    md: 280,
  };

  const isCollapsedWidth = {
    xs: '100%',
    sm: 72,
    md: 72,
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

  return (
    <>
      {!isMobile ? (
        // Desktop sidebar
        <>
          {!searchDrawerOpen ? (
            <Box
              sx={{
                width: isCollapsed ? isCollapsedWidth : sidebarWidth,
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                backgroundColor: 'white',
                borderRight: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                p: isCollapsed ? 1.5 : 3,
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
                mb: 4,
                pl: isCollapsed ? 0.5 : 0
              }}>
                {!isCollapsed && (
                  <Button
                    color="inherit"
                    onClick={() => navigate('/')}
                    sx={{
                      textTransform: 'none',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' },
                      fontWeight: 'bold',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: 'transparent',
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
                px: isCollapsed ? 0 : 1,
                '& .MuiListItemButton-root': {
                  borderRadius: 2,
                  mb: 0.5,
                  minHeight: 48,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }
              }}>
                {showSearch && (
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton 
                      onClick={handleSearchOpen}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      {!isCollapsed && (
                        <ListItemText 
                          primary="Search" 
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            color: 'text.secondary',
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                )}

                {menuItems.map((item) => (
                  <ListItem key={item.path} disablePadding>
                    <ListItemButton
                      onClick={item.onClick}
                      selected={isActive(item.path)}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                          '& .MuiListItemIcon-root': {
                            color: 'inherit',
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <item.icon />
                      </ListItemIcon>
                      {!isCollapsed && (
                        <ListItemText 
                          primary={item.label} 
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}

                <ListItem disablePadding sx={{ mt: 'auto' }}>
                  <ListItemButton
                    onClick={handleLogout}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'error.contrastText',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    {!isCollapsed && (
                      <ListItemText 
                        primary="Logout" 
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </List>
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
                    placeholder="Search..."
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>

                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                  <Tab label="Opportunities" />
                  <Tab label="People" />
                </Tabs>

                {isSearching ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : searchError ? (
                  <Typography color="error" sx={{ p: 2 }}>
                    {searchError}
                  </Typography>
                ) : (
                  <>
                    <TabPanel value={tabValue} index={0}>
                      {opportunityResults.length > 0 ? (
                        <List>
                          {opportunityResults.map((result) => (
                            <ListItem key={result.id} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  navigate(`/opportunity/${result.id}`);
                                  handleSearchClose();
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar src={result.image_url} alt={result.title} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={result.title}
                                  secondary={result.organization}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                          No opportunities found
                        </Typography>
                      )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      {peopleResults.length > 0 ? (
                        <List>
                          {peopleResults.map((result) => (
                            <ListItem key={result.id} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  navigate(`/profile/${result.id}`);
                                  handleSearchClose();
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar src={result.profile_picture} alt={result.username} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${result.first_name} ${result.last_name}`}
                                  secondary={result.username}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                          No people found
                        </Typography>
                      )}
                    </TabPanel>
                  </>
                )}
              </Box>
            </Drawer>
          )}
        </>
      ) : (
        // Mobile bottom navigation
        <>
          <AppBar 
            position="fixed" 
            color="inherit" 
            elevation={0}
            sx={{ 
              top: 'auto', 
              bottom: 0,
              borderTop: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'white',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-around', minHeight: 56 }}>
              {menuItems.map((item) => (
                <IconButton
                  key={item.path}
                  onClick={item.onClick}
                  color={isActive(item.path) ? 'primary' : 'default'}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <item.icon />
                </IconButton>
              ))}
              <IconButton
                onClick={handleLogout}
                color="default"
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'error.main',
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {showSearch && (
            <Drawer
              anchor="bottom"
              open={searchDrawerOpen}
              onClose={handleSearchClose}
              sx={{
                '& .MuiDrawer-paper': {
                  height: '80vh',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
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
                    placeholder="Search..."
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Box>

                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
                  <Tab label="Opportunities" />
                  <Tab label="People" />
                </Tabs>

                {isSearching ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                  </Box>
                ) : searchError ? (
                  <Typography color="error" sx={{ p: 2 }}>
                    {searchError}
                  </Typography>
                ) : (
                  <>
                    <TabPanel value={tabValue} index={0}>
                      {opportunityResults.length > 0 ? (
                        <List>
                          {opportunityResults.map((result) => (
                            <ListItem key={result.id} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  navigate(`/opportunity/${result.id}`);
                                  handleSearchClose();
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar src={result.image_url} alt={result.title} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={result.title}
                                  secondary={result.organization}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                          No opportunities found
                        </Typography>
                      )}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      {peopleResults.length > 0 ? (
                        <List>
                          {peopleResults.map((result) => (
                            <ListItem key={result.id} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  navigate(`/profile/${result.id}`);
                                  handleSearchClose();
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar src={result.profile_picture} alt={result.username} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={`${result.first_name} ${result.last_name}`}
                                  secondary={result.username}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography color="text.secondary" sx={{ p: 2 }}>
                          No people found
                        </Typography>
                      )}
                    </TabPanel>
                  </>
                )}
              </Box>
            </Drawer>
          )}
        </>
      )}
    </>
  );
};

export default Header; 