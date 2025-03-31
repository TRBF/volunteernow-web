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
  const [tabValue, setTabValue] = useState(0);
  const [opportunityResults, setOpportunityResults] = useState<any[]>([]);
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
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
        // Process results like the mobile app
        const processedResults = Array.isArray(results) ? results : [results];
        const opportunities = processedResults.filter((result: any) => result && result.name);
        const people = processedResults.filter((result: any) => result && result.username);
        
        setOpportunityResults(opportunities.map((opp: any) => ({
          id: opp.id,
          title: opp.name,
          organization: opp.organization,
          image_url: opp.post_image ? `${MEDIA_BASE_URL}${opp.post_image}` : '',
        })));
        
        setPeopleResults(people.map((person: any) => ({
          id: person.id,
          username: person.username,
          first_name: person.first_name,
          last_name: person.last_name,
          profile_picture: person.profile_picture ? `${MEDIA_BASE_URL}${person.profile_picture}` : '',
        })));
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

  const sidebarWidth = 280;

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
    { path: '/archive', icon: ArchiveIcon, label: 'Archive', onClick: () => navigate('/archive') },
    { path: '/profile', icon: PersonIcon, label: 'Profile', onClick: handleProfileClick },
  ];

  return (
    <>
      {!searchDrawerOpen ? (
        <Box
          sx={{
            width: isCollapsed ? 72 : sidebarWidth,
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
                  fontSize: '1.5rem',
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

          <List sx={{ flex: 1, px: isCollapsed ? 0 : 1 }}>
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
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mb: 2 }} />

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ 
              mt: 'auto',
              mb: 2,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              color: 'text.secondary',
              px: isCollapsed ? 2 : 3,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.palette.primary.main,
              },
            }}
          >
            {!isCollapsed && 'Logout'}
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            width: sidebarWidth,
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            backgroundColor: 'white',
            borderRight: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton 
              onClick={handleSearchClose}
              sx={{ 
                mr: 2,
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Search..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              InputProps={{
                disableUnderline: true,
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiInputBase-root': {
                  fontSize: '1.1rem',
                },
              }}
            />
          </Box>

          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="search tabs"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 100,
              },
            }}
          >
            <Tab label="Opportunities" />
            <Tab label="People" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <List>
              {isSearching ? (
                <ListItem>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <CircularProgress size={20} />
                    <Typography>Searching opportunities...</Typography>
                  </Box>
                </ListItem>
              ) : searchError ? (
                <ListItem>
                  <Typography color="error">{searchError}</Typography>
                </ListItem>
              ) : opportunityResults.length > 0 ? (
                opportunityResults.map((result) => (
                  <ListItem key={result.id} button onClick={() => navigate(`/opportunity/${result.id}`)}>
                    <ListItemAvatar>
                      <Avatar src={result.image_url}>{result.title[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={result.title}
                      secondary={result.organization}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No opportunities found" />
                </ListItem>
              )}
            </List>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <List>
              {isSearching ? (
                <ListItem>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <CircularProgress size={20} />
                    <Typography>Searching people...</Typography>
                  </Box>
                </ListItem>
              ) : searchError ? (
                <ListItem>
                  <Typography color="error">{searchError}</Typography>
                </ListItem>
              ) : peopleResults.length > 0 ? (
                peopleResults.map((result) => (
                  <ListItem key={result.id} button onClick={() => navigate(`/profile/${result.id}`)}>
                    <ListItemAvatar>
                      <Avatar src={result.profile_picture}>{result.username[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={result.username}
                      secondary={`${result.first_name} ${result.last_name}`}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No people found" />
                </ListItem>
              )}
            </List>
          </TabPanel>
        </Box>
      )}
    </>
  );
};

export default Header; 