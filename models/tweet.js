import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
});

tweetSchema.index({ createdAt: -1 });

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
