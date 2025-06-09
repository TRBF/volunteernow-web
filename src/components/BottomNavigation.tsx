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
              placeholder="Search people..."
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
              {peopleResults.length === 0 && searchQuery.trim() && (
                <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                  No results found
                </Typography>
              )}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default BottomNav; 