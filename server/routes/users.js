import express from 'express';
import { followUnfollowUser, getUser, getUserFollowers } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/followers', verifyToken, getUserFollowers);

/* UPDATE */
router.patch('/:id/:followerId', verifyToken, followUnfollowUser);
export default router;