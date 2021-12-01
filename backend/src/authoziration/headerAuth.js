
const getTokenFromHeaders = (headers) => {
  if (!headers.authorization) throw 'None Authorization header';
  const authArr = headers.authorization.split(' ');
  if (authArr.length === 2 && authArr[0] === 'Bearer') return authArr[1];
  else throw 'Bad Authorization header';
};

module.exports.getTokenFromHeaders = getTokenFromHeaders;