const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

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

exports.login = (req, res, next) => {};
