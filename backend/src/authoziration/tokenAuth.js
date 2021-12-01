const jwt = require('jsonwebtoken');

/**
* Generates Access Token for given User ID
* @param {number} userId 
* @returns {string} JWT access token
*/
const genAccessToken = userId => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

/**
* Generates Refresh Token for given User ID
* @param {number} userId 
* @returns {string} JWT refresh token
*/
const genRefreshToken = userId => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
};

/**
* Verifies Access Token, and returns 
* @param {string} token Access Token
* @returns {number} userId
*/
const verifyAccessToken = token => {
  const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return userId;
};

/**
* Verifies Access Token, and returns 
* @param {string} token Access Token
* @throws 
* @returns {number} userId
*/
const verifyRefreshToken = token => {
  const { userId } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return userId;
};

module.exports.genAccessToken = genAccessToken;
module.exports.genRefreshToken = genRefreshToken;
module.exports.verifyAccessToken = verifyAccessToken;
module.exports.verifyRefreshToken = verifyRefreshToken;