const jwt = require('jsonwebtoken');

const genAccessToken = data => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

const genRefreshToken = data => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2h' });
}

const verifyAccessToken = token => {
  const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return userId;
}

const verifyRefreshToken = token => {
  const { userId } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  return userId;
}

module.exports.genAccessToken = genAccessToken;
module.exports.genRefreshToken = genRefreshToken;
module.exports.verifyAccessToken = verifyAccessToken;
module.exports.verifyRefreshToken = verifyRefreshToken;