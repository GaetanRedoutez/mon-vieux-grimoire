const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/**
 * Mongoose model:
 * - email: String (required, unique) - Email address of the user
 * - password: String (required) - Hashed password of the user
 */
module.exports = mongoose.model('User', userSchema);
