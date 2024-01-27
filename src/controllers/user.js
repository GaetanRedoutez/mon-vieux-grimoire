const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/**
 * Controller function for user signup
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 201):
 *   Returns a message "New user created!" in JSON format
 *
 * Error Response (Status 400 or 500):
 *   Returns an error message in JSON format
 */
exports.signup = (req, res, next) => {
  // Hash the password using bcrypt with a salt factor of 10
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPwd) => {
      // Create a new user instance with the hashed password
      const newUser = new User({
        email: req.body.email,
        password: hashedPwd,
      });

      // Save the new user to the database
      newUser
        .save()
        .then(() => res.status(201).json({ message: 'New user created !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/**
 * Controller function for user login
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 200):
 *   Returns the user ID and a JWT token in JSON format
 *
 * Error Response (Status 401 or 500):
 *   Returns an error message in JSON format
 */
exports.login = (req, res, next) => {
  // Find the user in the database based on the provided email
  User.findOne({ email: req.body.email })
    .then((user) => {
      // Check if the user exists
      if (!user) {
        return res
          .status(401)
          .json({ error: 'Paire identifiant/mot de passe incorrect' });
      }
      // Compare the provided password with the hashed password in the database
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // Check if the password is valid
          if (!valid) {
            return res
              .status(401)
              .json({ error: 'Paire identifiant/mot de passe incorrect' });
          }

          // If the credentials are valid, generate a JWT token and send it in the response
          return res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
              },
              'JWT_TOKEN',
              { expiresIn: '24h' }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
