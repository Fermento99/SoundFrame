const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  _id: false,
  showTitle: { type: Boolean, default: true },
  showArtist: { type: Boolean, default: true },
  showCover: { type: Boolean, default: true },
});

const reactionSchema = new mongoose.Schema({
  _id: false,
  type: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const rawPostSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spotifyId: { type: String, required: true, },
  bgcolor: { type: String, required: true },
  shape: { type: String, required: true },
  preferences: preferencesSchema,
});

const postSchema = new mongoose.Schema({
  content: { type: rawPostSchema, required: true, _id: false },
  comments: [rawPostSchema],
  reactions: [reactionSchema],
});

postSchema.post('find', async(docs) => {
  for (let post of docs) {
    await post.populate({ path: 'content.owner', select: 'avatar username' });
  }
});

postSchema.post(['findOne', 'findById'], async(doc) => {
  await doc.populate({ path: 'comments.owner content.owner reactions.owner', select: 'avatar username' });
});

module.exports = mongoose.model('Post', postSchema);