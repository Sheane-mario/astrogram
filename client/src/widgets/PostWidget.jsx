import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutlined,
    EditOutlined,  
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, TextField, Button } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");  
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
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
  
  
    return (
      <WidgetWrapper m="2rem 0">
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
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length || 0}</Typography>
          </FlexBetween>
        </FlexBetween>
  
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
  