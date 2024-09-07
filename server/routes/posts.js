import express from "express";
import { createPost, getFeedPosts, getUserPosts, likePost, addComment, getComments,deleteComment, editComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
//router.post('/', verifyToken, createPost);
/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/*COMMENT*/
router.post("/:id/comment", verifyToken, addComment);
router.get("/:id/comments", getComments);
router.delete("/:postId/comments/:commentId", verifyToken, deleteComment);
router.patch("/:postId/comments/:commentId", verifyToken, editComment);

export default router;