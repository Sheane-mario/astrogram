// server/routes/posts.js

import express from "express";
import { createPost, getFeedPosts, getUserPosts, deletePost, addOrUpdateReaction, getAllReactions, deleteReaction , addComment, getComments, deleteComment, editComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* POSTS */
router.post('/', verifyToken, createPost);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.delete("/:id", verifyToken, deletePost);

/* REACTIONS */
router.patch("/:id/reaction", verifyToken, addOrUpdateReaction);
router.get("/:id/reactions", verifyToken, getAllReactions);
router.delete("/:id/reaction", verifyToken, deleteReaction);

/*COMMENT*/
router.post("/:id/comment", verifyToken, addComment);
router.get("/:id/comments", getComments);
router.delete("/:postId/comments/:commentId", verifyToken, deleteComment);
router.patch("/:postId/comments/:commentId", verifyToken, editComment);

export default router;