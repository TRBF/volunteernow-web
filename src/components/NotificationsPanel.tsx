import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { notificationsService } from '../services/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  read: boolean;
  opportunity_id: number;
  type: 'application_update' | 'new_callout' | 'reminder';
}

const NotificationsPanel = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await notificationsService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (notificationId: number) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      setNotifications(prev =>
        prev.filter(notification => notification.id !== notificationId)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    navigate(`/opportunity/${notification.opportunity_id}`);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Box sx={{ p: 3, pb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
            <NotificationsIcon />
          </Badge>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <List sx={{ '& .MuiListItem-root': { mb: 2 } }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    borderRadius: 1,
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  }}
                >
                  <ListItemText
                    primary={notification.title}
                    secondary={notification.message}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: notification.read ? 'normal' : 'bold',
                      },
                    }}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Mark as read">
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        sx={{ mr: 1 }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 2 }} />
              </React.Fragment>
            ))
          ) : (
            <Typography color="text.secondary" align="center">
              No notifications
            </Typography>
          )}
        </List>
      </Box>
    </Paper>
  );
};

export default NotificationsPanel; 