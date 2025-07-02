import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
} from '@mui/material';
import { userSearchService } from '../services/api';

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
}

interface UserSearchProps {
  query: string;
  onUserSelect: (user: User) => void;
  visible: boolean;
}

export const UserSearch: React.FC<UserSearchProps> = ({
  query,
  onUserSelect,
  visible,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!visible || query.length < 2) {
      setUsers([]);
      return;
    }

    // Debounce the search
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const results = await userSearchService.searchUsers(query);
        setUsers(results);
      } catch (err) {
        setError('Failed to search users');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, visible]);

  if (!visible || query.length < 2) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
        maxHeight: 200,
        overflow: 'auto',
      }}
    >
      {loading && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Searching...
          </Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        </Box>
      )}

      {!loading && !error && users.length === 0 && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No users found
          </Typography>
        </Box>
      )}

      {!loading && !error && users.length > 0 && (
        <List sx={{ p: 0 }}>
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => onUserSelect(user)}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={user.profile_picture || undefined}
                  alt={user.username}
                >
                  {user.first_name?.[0] || user.username[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <strong>@{user.username}</strong>
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {user.first_name} {user.last_name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}; 