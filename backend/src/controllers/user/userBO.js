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
const getFeed = async (userId, preferences) => {
  const { shape, bgcolor, skip, limit } = preferences;
  const user = await User.findById(userId, 'observed');
  if (!user || !user.observed) return [];

  const filter = { 'content.owner': { $in: user.observed } };
  if (shape || bgcolor) {
    if (shape) { filter['content.shape'] = shape; }
    if (bgcolor) { filter['content.bgcolor'] = bgcolor; }

    return await Post.find(filter, '', { skip, limit }).sort({ _id: -1 });
  }
  return await Post.find(filter).sort({ _id: -1 });
};


/**
 * Gets user data from db
 * @param {string} userId user id
 * @returns user sodial data
 */
const getData = async (userId) => {
  const user = await User.findById(userId, 'username avatar');
  if (user === null) return null
  const posts = await Post.find({ 'content.owner': userId });
  return { user, posts };
};


/**
 * Gets user data from db
 * @param {string} username user id
 * @returns user sodial data
 */
const getDataByName = async (username) => {
  const user = await User.findOne({ username }, 'username avatar');
  if (user === null) return null
  const posts = await Post.find({ 'content.owner': user._id });
  return { user, posts };
};


module.exports.observeUser = observeUser;
module.exports.unobserveUser = unobserveUser;
module.exports.getFeed = getFeed;
module.exports.getData = getData;
module.exports.getDataByName = getDataByName;