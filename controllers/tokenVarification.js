const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
exports.verify = (req, res, next) => {
  const accessToken = req.get('authorization');

  // if there is no token stored in cookies, the request is unauthorized
  if (!accessToken) {
    return res.status(403).send();
  }

  let payload;
  try {
    // use the jwt.verify method to verify the access token
    // throws an error if the token has expired or has a invalid signature
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    // if an error occured return request unauthorized error
    return res.status(401).send();
  }
};
