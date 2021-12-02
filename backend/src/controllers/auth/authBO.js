const bcrypt = require('bcrypt');
const User = require('../../dbmanager/models/user');


/**
 * Registers new user in database
 * @param {object} userObj user data
 * @param {string} userObj.username user's username
 * @param {string} userObj.pass user's password
 * @param {string} userObj.pass2 user's password repeated
 * @param {string} userObj.email user's email
 * @param {object} userObj.avatar user's avatar
 * @throws MongoDB error
 * @throws 'passwords dont match' error
 */
const createUser = async (userObj) => {
  if (userObj.pass !== userObj.pass2) throw 'passwords do not match';

  const user = {
    username: userObj.username,
    email: userObj.email,
    password: bcrypt.hashSync(userObj.pass, parseInt(process.env.SALT_ROUNDS, 10)),
    avatar: userObj.avatar,
  };
  await User.syncIndexes();
  await User.create(user);
};


/**
 * Returrns user ID if email and password match
 * @param {object} userObj User login data
 * @param {string} userObj.email user email
 * @param {string} userObj.pass user passowrd
 * @returns userId: number | false 
 */
const loginUser = async (userObj) => {
  const user = await User.findOne({ email: userObj.email }).exec().catch(err => { throw err; });
  if (!user || !userObj.pass) return false;
  try {
    return bcrypt.compareSync(userObj.pass, user.password)
      ? user
      : false
  } catch (err) {
    throw err;
  }
};


module.exports.createUser = createUser;
module.exports.loginUser = loginUser;