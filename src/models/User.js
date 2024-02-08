const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
/**
 * Mongoose model:
 * - email: String (required, unique) - Email address of the user
 * - password: String (required) - Hashed password of the user
 */
module.exports = mongoose.model('User', userSchema);
