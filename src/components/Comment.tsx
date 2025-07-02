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
  Chip,
  Link,
} from '@mui/material';
import { MoreVert, Edit, Delete, Report } from '@mui/icons-material';
import { commentService } from '../services/api';
import { ReportUser } from './ReportUser';

interface CommentProps {
  comment: {
    id: number;
    content: string;
    created_at: string;
    user: number; // UserProfile ID
    user_username: string;
    user_first_name: string;
    user_last_name: string;
    user_profile_picture: string | null;
    tagged_users?: Array<{
      id: number;
      username: string;
      first_name: string;
      last_name: string;
    }>;
  };
  currentUserId?: number;
  onCommentUpdated: (commentId: number, newContent: string) => void;
  onCommentDeleted: (commentId: number) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  currentUserId,
  onCommentUpdated,
  onCommentDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const isOwnComment = currentUserId === comment.user;
  const canEdit = isOwnComment;
  const canDelete = isOwnComment;

  // Handle missing user data gracefully
  const userDisplayName = comment.user_first_name && comment.user_last_name 
    ? `${comment.user_first_name} ${comment.user_last_name}`.trim()
    : comment.user_username || 'Unknown User';
  
  const userInitial = (comment.user_first_name && comment.user_first_name[0]) || 
                     (comment.user_username && comment.user_username[0]) || '?';

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
        await commentService.deleteComment(comment.id.toString());
        onCommentDeleted(comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment');
      }
    }
    handleMenuClose();
  };

  const handleReport = () => {
    setShowReportDialog(true);
    handleMenuClose();
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;

    setIsSubmitting(true);
    try {
      await commentService.updateComment(comment.id.toString(), editContent);
      onCommentUpdated(comment.id, editContent);
      setIsEditing(false);
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

  const renderContent = (content: string) => {
    // Highlight @mentions
    const parts = content.split(/(@\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <Chip
            key={index}
            label={part}
            size="small"
            variant="outlined"
            sx={{ mx: 0.5, fontSize: '0.75rem' }}
          />
        );
      }
      return part;
    });
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Avatar
            src={comment.user_profile_picture || undefined}
            alt={comment.user_username || 'User'}
          >
            {userInitial}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {userDisplayName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{comment.user_username || 'unknown'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(comment.created_at)}
              </Typography>
            </Box>

            {isEditing ? (
              <Box>
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
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </Button>
                  <Button size="small" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ mb: 1 }}>
                {renderContent(comment.content)}
              </Typography>
            )}

            {comment.tagged_users && comment.tagged_users.length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Tagged: {comment.tagged_users.map(user => `@${user.username}`).join(', ')}
                </Typography>
              </Box>
            )}
          </Box>

          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {canEdit && (
            <MenuItem onClick={handleEdit}>
              <Edit sx={{ mr: 1 }} fontSize="small" />
              Edit
            </MenuItem>
          )}
          {canDelete && (
            <MenuItem onClick={handleDelete}>
              <Delete sx={{ mr: 1 }} fontSize="small" />
              Delete
            </MenuItem>
          )}
          {!isOwnComment && (
            <MenuItem onClick={handleReport}>
              <Report sx={{ mr: 1 }} fontSize="small" />
              Report User
            </MenuItem>
          )}
        </Menu>
      </Paper>

      <ReportUser
        open={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        reportedUserId={comment.user}
        reportedUsername={comment.user_username}
      />
    </>
  );
}; 