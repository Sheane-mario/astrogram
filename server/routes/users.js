// server/routes/users.js

import express from 'express';
import { followUnfollowUser, getUser, getUserFollowers, getUserFollowing, unfollowUser, removeFollower } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/followers', verifyToken, getUserFollowers);
router.get('/:id/following', verifyToken, getUserFollowing);
/* UPDATE */
router.patch('/:id/:targetPersonId', verifyToken, followUnfollowUser);

/* DELETE */
router.patch('/:id/:targetPersonId/unfollow', verifyToken, unfollowUser);
router.delete('/:id/:targetPersonId/removeFollower', verifyToken, removeFollower);

export default router;