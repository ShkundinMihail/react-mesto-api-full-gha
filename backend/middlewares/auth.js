const jwt = require('jsonwebtoken');
const NoAuthorizedError = require('../errors/NoAuthorized401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new NoAuthorizedError('Authorization required'));
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new NoAuthorizedError('Authorization required'));
  }

  req.user = payload;

  return next();
};
