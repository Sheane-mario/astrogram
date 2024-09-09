// client/src/widgets/PostWidget.jsx

import React from 'react';
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    RocketOutlined,
    PublicOutlined,
    StarBorderOutlined,
    ShareOutlined,
    DeleteOutlined,
    EditOutlined,  
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, Tooltip, Popover, TextField, Button, Avatar, CircularProgress } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import UserImage from "components/UserImage";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setPosts } from "state";
  import { motion } from "framer-motion";

  const reactionIcons = {
    like: FavoriteBorderOutlined,
    globe: PublicOutlined,
    star: StarBorderOutlined,
    rocket: RocketOutlined,
  };
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    reactions,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");  
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isPostCreator = postUserId === loggedInUserId;

    const [isReactionsVisible, setIsReactionsVisible] = useState(false);
    const userReaction = Array.isArray(reactions) ? reactions.find(reaction => reaction.userId === loggedInUserId) : null;
    const selectedReactionType = userReaction ? userReaction.type : null;
    const reactionCount = Array.isArray(reactions) ? reactions.length : 0;
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reactionUsers, setReactionUsers] = useState([]);


    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const medium = palette.neutral.medium;

    const list = {
      visible: {
        opacity: 1,
        transition: {
          when: "afterChildren",
          staggerChildren: 0.2,
        },
      },
      hidden: {
        opacity: 0,
        transition: {
          when: "beforeChildren",
        },
        scale: 0.6,
      },
    };

    //Handle get reactins
    const fetchReactionUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/reactions`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch reaction users");
        const data = await response.json();
        setReactionUsers(data);
      } catch (error) {
        console.error("Error fetching reaction users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Handle Reactions add/update/delete
    const handleReaction = async (reactionType) => {
      try {
        const isRemoving = selectedReactionType === reactionType;
        const method = isRemoving ? "DELETE" : "PATCH";
    
        const response = await fetch(`http://localhost:3001/posts/${postId}/reaction`, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: loggedInUserId,
            type: reactionType,
          }),
        });
    
        if (!response.ok) throw new Error("Failed to update reaction");
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    
        // Update state to reflect reaction removal or update
        setIsReactionsVisible(false);
      } catch (error) {
        console.error("Error updating reaction:", error);
      }
    };

    //handleAddComment
    const handleAddComment = async () => {
      if (newComment.trim() === "") return;
  
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId, text: newComment }),
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
        }
        
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error.message);
        // You might want to show an error message to the user here
      }
    }

    const handleReactionClick = async (event) => {
      setAnchorEl(event.currentTarget);
      await fetchReactionUsers();
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'reaction-popover' : undefined;

    //handleDeleteComment
    const handleDeleteComment = async (commentId) => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comments/${commentId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
      } catch (error) {
        console.error("Error deleting comment:", error.message);
      }
    };
  
    //handleEditComment
    const handleEditComment = async (commentId) => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comments/${commentId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId, text: editCommentText }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setEditingCommentId(null);
        setEditCommentText("");
      } catch (error) {
        console.error("Error editing comment:", error.message);
      }
    };

    const deletePost = async () => {
      if (!isPostCreator) {
        console.error("You don't have permission to delete this post");
        return;
      }
      
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const { deletedPostId } = await response.json();
        dispatch(setPost({ post: null, postId: deletedPostId }));
      } else {
        console.error("Failed to delete post");
      }
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={userPicturePath} size="55px" />
            <Box>
              <Typography
                variant="h4"
                color={main}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {location}
              </Typography>
            </Box>
          </FlexBetween>
          {isPostCreator && (
            <IconButton onClick={deletePost}>
              <DeleteOutlined />
            </IconButton>
          )}
        </FlexBetween>

        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <div
            onMouseEnter={() => setIsReactionsVisible(true)}
            onMouseLeave={() => setIsReactionsVisible(false)}
            style={{ position: 'relative' }}
          >
            <Tooltip title="React">
              <IconButton>
                {selectedReactionType ? (
                  React.createElement(reactionIcons[selectedReactionType], { sx: { color: primary, fontSize: '24px' } })
                ) : (
                  <FavoriteBorderOutlined sx={{ color: main, fontSize: '24px' }} />
                )}
              </IconButton>
            </Tooltip>

            {isReactionsVisible && (
              <motion.div
                className="reactionsHolder"
                variants={list}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{
                  display: 'flex',
                  gap: '1rem', // Increased gap for more spacing
                  position: 'absolute',
                  bottom: '20px', // Adjusted to position the box lower
                  left: '-120%',
                  transform: 'translateX(-50%)',
                  backgroundColor: palette.background.alt,
                  padding: '1rem', // Increased padding
                  borderRadius: '16px', // More rounded corners
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                {Object.entries(reactionIcons).map(([reactionType, Icon]) => (
                  <motion.div
                    key={reactionType}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleReaction(reactionType)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Icon sx={{ fontSize: '40px', color: selectedReactionType === reactionType ? primary : main }} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
          <Typography onClick={handleReactionClick} style={{ cursor: 'pointer' }}>{reactionCount}</Typography>
          <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              PaperProps={{
                style: {
                  maxHeight: 300,
                  overflowY: 'auto',
                  minWidth: 300, // Increased minWidth
                  borderRadius: '16px', // More rounded corners
                },
              }}
            >
              <Box p={2}>
                {isLoading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                    <CircularProgress />
                  </Box>
                ) : (
                  reactionUsers.map((user, index) => {
                    if (!user) return null; // Skip if user is null
                    return (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                        <Avatar src={user.picturePath ? `http://localhost:3001/assets/${user.picturePath}` : ''} sx={{ width: 32, height: 32, mr: 1 }} />
                        <Typography variant="body2" sx={{ flexGrow: 1, mr: 2 }}>{user.username || 'Unknown'}</Typography>
                        {React.createElement(reactionIcons[user.type] || FavoriteBorderOutlined, { sx: { fontSize: 24, color: main } })}
                      </Box>
                    );
                  })
                )}
              </Box>
            </Popover>

  
            <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length || 0}</Typography>
          </FlexBetween>
        </FlexBetween>
        {isPostCreator && (
          <IconButton onClick={deletePost}>
            <DeleteOutlined />
          </IconButton>
        )}
  
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {Array.isArray(comments) && comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <strong>{`${comment?.userId?.firstName || 'Unknown'} ${comment?.userId?.lastName || ''}`}</strong>: {comment?.text || 'No comment text'}
              </Typography>
              {comment?.userId?._id === loggedInUserId && (
                <FlexBetween>
                  <IconButton onClick={() => comment?._id && setEditingCommentId(comment._id)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => comment?._id && handleDeleteComment(comment._id)}>
                    <DeleteOutlined />
                  </IconButton>
                </FlexBetween>
              )}
              {editingCommentId === comment?._id && (
                <Box mt="0.5rem">
                  <TextField
                    fullWidth
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                  />
                  <Button onClick={() => comment?._id && handleEditComment(comment._id)}>Save</Button>
                  <Button onClick={() => setEditingCommentId(null)}>Cancel</Button>
                </Box>
              )}
            </Box>
          ))}
          <Divider />
            <FlexBetween mt="1rem">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddComment();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ ml: "1rem" }}
            >
              Post
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};
  
  export default PostWidget;
  