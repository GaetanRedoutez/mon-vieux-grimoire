const fs = require('node:fs')

const Book = require('../models/Book')
const resizeImage = require('../lib/sharp')

/**
 * Controller to get all books
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 200):
 *   Returns an array of books in JSON format
 *
 * Error Response (Status 404):
 *   Returns the error in JSON format
 */
exports.getAllBooks = (req, res, next) => {
  // Use find method to get all books
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(404).json({ error }))
}

/**
 * Controller to get best rating books
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 200):
 *   Returns an array of books in JSON format
 *
 * Error Response (Status 404):
 *   Returns the error in JSON format
 */
exports.getBestRatingBooks = (req, res, next) => {
  // Use find method to get all books
  Book.find()
    .then((books) => {
      // Sort books by average rating
      const sortedBooks = [...books].sort(
        (a, b) => b.averageRating - a.averageRating
      )

      // Create a new array with 3 best average rating books
      const bestBooks = sortedBooks.slice(0, 3)

      res.status(200).json(bestBooks)
    })
    .catch((error) => res.status(404).json({ error }))
}

/**
 * Controller to get one book
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 200):
 *   Returns a book in JSON format
 *
 * Error Response (Status 404):
 *   Returns the error in JSON format
 */
exports.getOneBook = (req, res, next) => {
  // Use findOne method to get one book by id
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }))
}

/**
 * Controller to create a new book
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 201):
 *   Returns a message "Book added!" in JSON format
 *
 * Error Response (Status 400 or 401(Provided by auth middleware)):
 *   Returns the error in JSON format
 */
exports.createBook = (req, res, next) => {
  // Parse req.body.book to create a bookObject
  const bookObject = JSON.parse(req.body.book)

  // Remove _id and _userId from bookObject to prevent tampering
  delete bookObject._id
  delete bookObject._userId

  const filePath = `${req.protocol}://${req.get('host')}/images`
  const imageName = `${req.file.filename.split('.')[0]}`
  const imagePath = `${filePath}/${imageName}.webp`

  // Create a new book instance with data from bookObject and file data
  const book = new Book({
    // The database will automatically assign an ID to the book object upon saving.
    ...bookObject,
    userId: req.auth.userId, // Use the userId provided by the authentication middleware
    imageUrl: imagePath
  })
  resizeImage(req.file.filename)
  // Save the book to the database
  book
    .save()
    .then(() => res.status(201).json({ message: 'Book added!' }))
    .catch((error) => res.status(400).json({ error }))
}

/**
 * Controller to delete a book and its associated file
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 200):
 *   Returns a message "Book deleted!" in JSON format
 *
 * Error Response (Status 401 or 500):
 *   Returns an error message in JSON format
 */
exports.deleteBook = (req, res, next) => {
  // Use the findOne method to retrieve data of the book to be deleted
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' })
      }

      // Check if the request userId matches the auth userId to prevent tampering
      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ message: 'Not authorized!' })
      }

      // Create a path to the file that needs to be deleted
      const filename = book.imageUrl.split('/images/')[1]
      const path = `public/images/${filename}`
      console.log(path)
      // Use the unlink method from Node's fs module to delete the file
      fs.unlink(path, () => {
        // Use the deleteOne method to delete the database entry
        Book.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Book deleted!' }))
          .catch((error) => res.status(500).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }))
}

/**
 * Controller to modify a book
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 201):
 *   Returns a message "Book updated!" in JSON format
 *
 * Error Response (Status 401 or 500):
 *   Returns an error message in JSON format
 */
exports.modifyBook = (req, res, next) => {
  // Use the findOne method to retrieve data of the book to be modified
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // Check if the book exists
      if (!book) {
        return res.status(404).json({ message: 'Book not found' })
      }

      // Check if the request userId matches the auth userId to prevent tampering
      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ message: 'Not authorized!' })
      }

      // Prepare a variable to contain modifications
      let updatedBook = {}

      // If modifications don't concern the file
      if (!req.body.book) {
        // Remove _id and _userId from req.body to prevent tampering
        delete req.body._id
        delete req.body.userId

        // Set updatedBook with modification info
        updatedBook = {
          ...req.body,
          userId: req.auth.userId
        }

        // If modifications concern the file
      } else {
        // Create a path to the file that needs to be deleted
        const filename = book.imageUrl.split('/images/')[1]
        const path = `public/images/${filename}`

        // Use the unlink method from Node's fs module to delete the file
        fs.unlink(path, (error) => {
          if (error) {
            console.log(error)
          }
        })

        // Parse req.body.book to create a bookObject
        const bookObject = JSON.parse(req.body.book)

        // Remove _id and _userId from bookObject to prevent tampering
        delete bookObject._id
        delete bookObject.userId

        const filePath = `${req.protocol}://${req.get('host')}/images`
        const imageName = `${req.file.filename.split('.')[0]}`
        const imagePath = `${filePath}/${imageName}.webp`

        // Set updatedBook with modification info
        updatedBook = {
          ...bookObject,
          userId: req.auth.userId,
          imageUrl: imagePath
        }
        resizeImage(req.file.filename)
      }

      // Use the updateOne method to apply modifications
      Book.updateOne({ _id: req.params.id }, updatedBook)
        .then(() => res.status(201).json({ message: 'Book updated!' }))
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

/** Controller to rate a book
 *
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next Go to the next middleware
 *
 * Success Response (Status 201):
 *   Returns the updated book in JSON format
 *
 * Error Response (Status 404 or 401):
 * Returns an error message in JSON format if the book is not found
 */
exports.rateBook = (req, res, next) => {
  // Find the book by its ID
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      // Check if the book exists
      if (!book) {
        return res.status(404).json({ message: 'Book not found' })
      }

      const hasAlreadyRated = book.ratings.find(
        (rating) => rating.userId === req.auth.userId
      )

      if (hasAlreadyRated) {
        return res.status(400).json({ message: 'Already rated!' })
      }

      // Create a new rating object with the user's ID and the provided rating
      const newRating = {
        userId: req.auth.userId,
        grade: req.body.rating
      }

      // Add the new rating to the book's ratings array
      book.ratings.push(newRating)

      // Calculate the average rating for the book
      let averageRating = 0.0
      for (let index = 0; index < book.ratings.length; index++) {
        const element = book.ratings[index].grade
        averageRating += element
      }

      book.averageRating = averageRating / book.ratings.length

      // Save the updated book with the new rating
      book
        .save()
        .then((book) => res.status(201).json(book))
        .catch((error) => res.status(404).json({ error: error.message }))
    })
    .catch((error) => res.status(404).json({ error }))
}
