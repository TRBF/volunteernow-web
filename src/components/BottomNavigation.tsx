import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Box,
  Drawer,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  WorkHistory as ExperienceIcon,
  Campaign as CalloutIcon,
  Description as ApplicationIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { searchService } from '../services/api';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [opportunityResults, setOpportunityResults] = useState<any[]>([]);
  const [peopleResults, setPeopleResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  if (!isMobile) return null;

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

  const handleSearchOpen = () => {
    setSearchDrawerOpen(true);
  };

  const handleSearchClose = () => {
    setSearchDrawerOpen(false);
    setSearchQuery('');
    setOpportunityResults([]);
    setPeopleResults([]);
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSearchError(null);
    
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

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <BottomNavigation
          value={location.pathname}
          onChange={(event, newValue) => {
            if (newValue === '/profile') {
              handleProfileClick();
            } else if (newValue === 'search') {
              handleSearchOpen();
            } else {
              navigate(newValue);
            }
          }}
          sx={{
            height: 56,
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0,
              padding: '6px 8px',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
            },
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="/"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Experience"
            value="/experience"
            icon={<ExperienceIcon />}
          />
          <BottomNavigationAction
            label="Callouts"
            value="/callouts"
            icon={<CalloutIcon />}
          />
          <BottomNavigationAction
            label="Applications"
            value="/applications"
            icon={<ApplicationIcon />}
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            value="/profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Box>

      <Drawer
        anchor="bottom"
        open={searchDrawerOpen}
        onClose={handleSearchClose}
        sx={{
          '& .MuiDrawer-paper': {
            height: '100%',
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
              value={searchQuery}
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
              <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
                {opportunityResults.length > 0 ? (
                  <List>
                    {opportunityResults.map((result) => (
                      <ListItem key={result.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/opportunity/${result.id}`);
                            handleSearchClose();
                          }}
                          sx={{
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                          }}
                        >
                          <ListItemText
                            primary={result.name}
                            secondary={result.description}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: '0.875rem',
                              }
                            }}
                            secondaryTypographyProps={{
                              sx: {
                                fontSize: '0.75rem',
                              }
                            }}
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
              </Box>

              <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
                {peopleResults.length > 0 ? (
                  <List>
                    {peopleResults.map((result) => (
                      <ListItem key={result.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                          onClick={() => {
                            navigate(`/profile/${result.id}`);
                            handleSearchClose();
                          }}
                          sx={{
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={result.profile_picture} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={result.username}
                            secondary={result.name}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: '0.875rem',
                              }
                            }}
                            secondaryTypographyProps={{
                              sx: {
                                fontSize: '0.75rem',
                              }
                            }}
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
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default BottomNav; 