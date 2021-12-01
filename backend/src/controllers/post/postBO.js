const Post = require('../../dbmanager/models/post');
const User = require('../../dbmanager/models/user');
const PostHelper = require('./postHelper');

const getPosts = async (preferences) => {
  const { id, userId, shape, bgcolor, skip, limit } = preferences;

  if (id) return await Post.findById(preferences.id);

  return await Post.find({ userId, shape, bgcolor }, '', { skip, limit });
};

const createPost = async (post, userId) => {
  if (!post) throw 'Empty post';

  const content = new PostHelper();
  Object.assign(content, post);
  content.owner = userId;

  await Post.create({ content });
};

const deletePost = async (postId, userId) => {
  const deleted = await Post.findOneAndDelete({ '_id': postId, 'content.owner': userId });
  if (!deleted) throw 'Found nothng to delete';
};

const addComment = async (postId, comment, userId) => {
  const commentObj = new PostHelper();
  Object.assign(commentObj, comment);
  commentObj.owner = userId;

  const updated = await Post.findByIdAndUpdate(postId, { $push: { 'comments': commentObj } });
  if (!updated) throw 'Post not found';
};

const addReaction = async (postId, reaction, userId) => {
  const reactionObj = {
    owner: userId,
    type: reaction,
  };
  const post = await Post.findById(postId, 'reactions');
  if (!post) throw 'Post not found';

  if (post.reactions.find(reaction => reaction.owner._id.toString() === userId)) {
    await Post.findOneAndUpdate({ _id: postId, 'reactions.owner': userId }, { $set: { 'reactions.$.type': reaction } });
  } else {
    await Post.findByIdAndUpdate(postId, { $push: { 'reactions': reactionObj } });
  }
};

const getFeed = async (userId) => {
  const observed = await User.findById(userId, 'observed');
  if (!observed) return [];
  return await Post.find({ owner: { $in: observed.observed } });
};

module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
module.exports.deletePost = deletePost;
module.exports.addComment = addComment;
module.exports.addReaction = addReaction;
module.exports.getFeed = getFeed;