import express from 'express';
import { postTweet, fetchTimeline } from '../controllers/tweetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, postTweet);
router.get('/:userId/timeline', fetchTimeline);

export default router;
