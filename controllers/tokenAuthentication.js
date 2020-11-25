const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const tokenAuth = async (req) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(decodedToken);

  if (!token || !decodedToken.id) {
    return { error: 'token missing or invalid' };
  }

  return decodedToken;
};

module.exports = tokenAuth;
