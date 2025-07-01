import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import { commentService } from '../services/api';

interface CommentProps {
  comment: {
    id: string;
    content: string;
    created_at: string;
    user_username: string;
    user_profile_picture: string;
    user_first_name: string;
    user_last_name: string;
  };
  currentUserId?: string;
  onCommentUpdated: () => void;
  onCommentDeleted: () => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  currentUserId,
  onCommentUpdated,
  onCommentDeleted,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.content);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.deleteComment(comment.id);
        onCommentDeleted();
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment');
      }
    }
    handleMenuClose();
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;

    setIsSubmitting(true);
    try {
      await commentService.updateComment(comment.id, editContent);
      setIsEditing(false);
      onCommentUpdated();
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const displayName = comment.user_first_name && comment.user_last_name
    ? `${comment.user_first_name} ${comment.user_last_name}`
    : comment.user_username;

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar
          src={comment.user_profile_picture}
          alt={displayName}
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {displayName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(comment.created_at)}
              </Typography>
            </Box>
            {currentUserId && (
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            )}
          </Box>

          {isEditing ? (
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSaveEdit}
                  disabled={isSubmitting || !editContent.trim()}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleCancelEdit}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default Comment; 