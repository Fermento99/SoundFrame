const User = require('../../dbmanager/models/user');
const Post = require('../../dbmanager/models/post');


/**
 * Adds user to observed
 * @param {string} userId observing user
 * @param {string} observedId observed user
 */
const observeUser = async (userId, observedId) => {
  await User.findByIdAndUpdate(userId, { $addToSet: { 'observed': observedId } });
};


/**
 * Removes user from observed
 * @param {string} userId observing user
 * @param {string} observedId observed user
 */
const unobserveUser = async (userId, observedId) => {
  await User.findByIdAndUpdate(userId, { $pull: { 'observed': observedId } });
};


/**
 * Gets user feed from db
 * @param {string} userId user id
 * @returns posts of user's feed
 */
const getFeed = async (userId) => {
  const user = await User.findById(userId, 'observed');
  if (!user || !user.observed) return [];
  return await Post.find({ 'content.owner': { $in: user.observed } });
};


module.exports.observeUser = observeUser;
module.exports.unobserveUser = unobserveUser;
module.exports.getFeed = getFeed;