const jwt = require('jsonwebtoken');

/**
 * Authentication middleware using jsonwebtoken for token verification
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 */
module.exports = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Secret key used to sign the JWT
    const jwtKey = 'JWT_TOKEN'; //TODO Clé pour dev mais faut mettre quoi en prod ?

    // Verify the token using the secret key
    const verifiedToken = jwt.verify(token, jwtKey);

    // Attach the userId from the token to the request object
    req.auth = {
      userId: verifiedToken.userId,
    };

    // Continue to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error });
  }
};
