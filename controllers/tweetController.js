import Tweet from '../models/tweet.js';

export const postTweet = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id;
  try {
    const tweet = await Tweet.create({ userId, text });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchTimeline = async (req, res) => {
  const userId = req.params.userId;
  const { cursor } = req.query;
  const limit = 10;

  try {
    const query = { userId };
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const tweets = await Tweet.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const nextCursor = tweets.length === limit ? tweets[tweets.length - 1]._id : null;

    res.status(200).json({ tweets, nextCursor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
