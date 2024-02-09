const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true }
    }
  ],
  averageRating: { type: Number, required: true }
})

/** Mongoose model :
 * - userId: String (required) - ID of the user who added the book
 * - title: String (required) - Title of the book
 * - author: String (required) - Author of the book
 * - imageUrl: String (required) - URL of the book cover image
 * - year: Number (required) - Year of publication of the book
 * - genre: String (required) - Genre of the book
 * - ratings: Array of objects - User ratings for the book, each containing:
 *    - userId: String (required) - ID of the user who rated the book
 *    - grade: Number (required) - Numeric rating given by the user
 * - averageRating: Number (required) - Average rating calculated from user ratings
 */
module.exports = mongoose.model('Book', bookSchema)
