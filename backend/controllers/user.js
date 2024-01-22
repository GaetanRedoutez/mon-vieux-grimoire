const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

//TODO Commenter la fonction
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPwd) => {
      const newUser = new User({
        email: req.body.email,
        password: hashedPwd,
      });

      newUser
        .save()
        .then(() => res.status(201).json({ message: 'New user created !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//TODO Commenter la fonction
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: 'Paire identifiant/mot de passe incorrect' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: 'Paire identifiant/mot de passe incorrect' });
          }
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
