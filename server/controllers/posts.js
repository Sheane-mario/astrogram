import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
        select: 'firstName lastName _id'
      }
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//COMMENT FUNCTIONS

//Add Comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      userId: user._id,
      postId: post._id,
      text: text,
    });

    const savedComment = await newComment.save();

        // Initialize comments array if it doesn't exist
        if (!post.comments) {
          post.comments = [];
        }
    
        post.comments.push(savedComment._id);
        await post.save();
    
        const updatedPost = await Post.findById(id).populate({
          path: 'comments',
          populate: {
            path: 'userId',
            select: 'firstName lastName'
          }
        });
    
        res.status(201).json(updatedPost);
      } catch (err) {
        console.error("Error in addComment:", err);
        res.status(409).json({ message: err.message });
      }
    };
    
    // Get all comments for a post
    export const getComments = async (req, res) => {
      try {
        const { id } = req.params;
        const post = await Post.findById(id);
    
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        res.status(200).json(post.comments);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    };

    //Delete a comment
    export const deleteComment = async (req, res) => {
      try {
        const { postId, commentId } = req.params;
        const { userId } = req.body;
    
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }
    
        const comment = await Comment.findById(commentId);
        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }
    
        if (comment.userId.toString() !== userId) {
          return res.status(403).json({ message: "User not authorized to delete this comment" });
        }
    
        await Comment.findByIdAndDelete(commentId);
        post.comments = post.comments.filter(id => id.toString() !== commentId);
        await post.save();
    
        const updatedPost = await Post.findById(postId).populate({
          path: 'comments',
          populate: {
            path: 'userId',
            select: 'firstName lastName'
          }
        });
    
        res.status(200).json(updatedPost);
      } catch (err) {
        console.error("Error in deleteComment:", err);
        res.status(500).json({ message: err.message });
      }
    };

    //Edit a comment
    export const editComment = async (req, res) => {
      try {
        const { postId, commentId } = req.params;
        const { userId, text } = req.body;
    
        const comment = await Comment.findById(commentId);
        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }
    
        if (comment.userId.toString() !== userId) {
          return res.status(403).json({ message: "User not authorized to edit this comment" });
        }
    
        comment.text = text;
        await comment.save();
    
        const updatedPost = await Post.findById(postId).populate({
          path: 'comments',
          populate: {
            path: 'userId',
            select: 'firstName lastName'
          }
        });
    
        res.status(200).json(updatedPost);
      } catch (err) {
        console.error("Error in editComment:", err);
        res.status(500).json({ message: err.message });
      }
    };
    
    
