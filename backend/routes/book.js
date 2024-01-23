/**
 * Routes for managing books in the application
 */

const express = require('express');
const router = express.Router();

// Middleware for authentication and file handling
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

// Controller functions for book operations
const bookControl = require('../controllers/book');

// Route to get all books
router.get('/', bookControl.getAllBooks);

// Route to create a new book (requires authentication and file upload)
router.post('/', auth, multer, bookControl.createBook);

// Route to get the best-rated books
router.get('/bestrating', bookControl.getBestRatingBooks);

// Route to get details of a specific book
router.get('/:id', bookControl.getOneBook);

// Route to delete a book (requires authentication)
router.delete('/:id', auth, bookControl.deleteBook);

// Route to modify a book (requires authentication and file upload)
router.put('/:id', auth, multer, bookControl.modifyBook);

// Route to rate a book (requires authentication)
router.post('/:id/rating', auth, bookControl.rateBook);

module.exports = router;
