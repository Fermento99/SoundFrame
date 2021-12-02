const User = require('../../dbmanager/models/user');

const observeUser = async (userId, observedId) => {
  await User.findByIdAndUpdate(userId, { $addToSet: { 'observed': observedId } });
};

const unobserveUser = async (userId, observedId) => {
  await User.findByIdAndUpdate(userId, { $pull: { 'observed': observedId } });
};

module.exports.observeUser = observeUser;
module.exports.unobserveUser = unobserveUser;