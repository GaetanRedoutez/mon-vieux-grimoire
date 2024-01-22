const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const jwtKey = 'JWT_TOKEN';

    const verifiedToken = jwt.verify(token, jwtKey);
    req.auth = {
      userId: verifiedToken.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
