const Post = require('../../dbmanager/models/post');
const postHelper = require('./postHelper');


/**
 * Gets Posts form db
 * @param {object} preferences filter object
 * @param {string} preferences.id if specified, method returns post with this id
 * @param {string} preferences.userId gets all user posts
 * @param {string} preferences.shape gets all posts in specified shape
 * @param {string} preferences.bgcolor gets all posts in specified color
 * @param {string} preferences.skip skips sepcified number of posts
 * @param {string} preferences.limit returns this many posts
 * @returns Posts according to preferences or all
 */
const getPosts = async (preferences) => {
  const { id, userId, shape, bgcolor, skip, limit } = preferences;

  if (id) { return await Post.findById(preferences.id); }

  if (userId || shape || bgcolor) {
    filter = {};
    if(userId) {filter['content.owner'] = userId;}
    if(shape) {filter['content.shape'] = shape;}
    if(bgcolor) {filter['content.bgcolor'] = bgcolor;}

    return await Post.find(filter, '', { skip, limit }).sort({ _id: -1 });
  }

  return await Post.find({}, '', { skip, limit }).sort({ _id: -1 });
};


/**
 * Creates new post on users account
 * @param {object} post post object to be stored
 * @param {string} userId owner id
 */
const createPost = async (post, userId) => {
  if (!post) throw 'Empty post';

  const content = postHelper(post);
  content.owner = userId;

  await Post.create({ content });
};


/**
 * deletes post of given id
 * @param {string} postId id of post to be deleted
 * @param {strin} userId owner id 
 */
const deletePost = async (postId, userId) => {
  const deleted = await Post.findOneAndDelete({ '_id': postId, 'content.owner': userId });
  if (!deleted) throw 'Found nothng to delete';
};


/**
 * Attaches comment to post
 * @param {string} postId commented post id
 * @param {object} comment comment object
 * @param {string} userId comment owner id
 */
const addComment = async (postId, comment, userId) => {
  const commentObj = postHelper(comment);
  commentObj.owner = userId;

  const updated = await Post.findByIdAndUpdate(postId, { $push: { 'comments': commentObj } });
  if (!updated) throw 'Post not found';
};


/**
 * Attaches reaction to post
 * @param {string} postId reacted post id
 * @param {string} reaction reaction type
 * @param {string} userId reaction owner id
 */
const addReaction = async (postId, reaction, userId) => {
  const reactionObj = {
    owner: userId,
    type: reaction,
  };
  const post = await Post.findById(postId, 'reactions');
  if (!post) throw 'Post not found';

  if (post.reactions.find(reaction => reaction.owner._id.equals(userId))) {
    await Post.findOneAndUpdate({ _id: postId, 'reactions.owner': userId }, { $set: { 'reactions.$.type': reaction } });
  } else {
    await Post.findByIdAndUpdate(postId, { $push: { 'reactions': reactionObj } });
  }
};


module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
module.exports.deletePost = deletePost;
module.exports.addComment = addComment;
module.exports.addReaction = addReaction;