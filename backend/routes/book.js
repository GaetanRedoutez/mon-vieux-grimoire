const express = require('express');
const router = express.Router();

// Middleware for authentication and file handling
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

// Controller functions for book operations
const bookControl = require('../controllers/book');

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     description: Retrieve a list of all books
 *     responses:
 *       200:
 *         description: Successful response with an array of books
 *       500:
 *         description: Internal server error
 */
router.get('/', bookControl.getAllBooks);

/**
 * @swagger
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     description: Create a new book and add it to the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Successful response with a message "Book added!"
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Returns the error in JSON format
 */
router.post('/', auth, multer, bookControl.createBook);

/**
 * @swagger
 * /api/books/bestrating:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get best rating books
 *     description: Retrieve a list of best rating books
 *     responses:
 *       200:
 *         description: Successful response with an array of books
 *       404:
 *         description: Returns the error in JSON format
 */
router.get('/bestrating', bookControl.getBestRatingBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get one book
 *     description: Retrieve a book
 *   parameters:
 *       - in: path
 *         name: id
 *         description: Id of selected book
 *         required: true
 *         schema:
 *           type: string
 *   responses:
 *       200:
 *         description: Successful response with a book
 *       404:
 *         description: Not found
 */
router.get('/:id', bookControl.getOneBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete selected book
 *     description: Delete selected book
 *     security:
 *       - bearerAuth: []
 *   parameters:
 *       - in: path
 *         name: id
 *         description: Id of selected book
 *         required: true
 *         schema:
 *           type: string
 *   responses:
 *       200:
 *         description: Successful response with a message "Book deleted!" in JSON format
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', auth, bookControl.deleteBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Modify selected book
 *     description: Modify selected book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of selected book
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *   responses:
 *       200:
 *         description: Successful response with a message "Book updated!" in JSON format
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put('/:id', auth, multer, bookControl.modifyBook);

/**
 * @swagger
 * /api/books/{id}/rating:
 *   post:
 *     tags:
 *       - Books
 *     summary: Rate selected book
 *     description: Rate selected book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of selected book
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ratings'
 *     responses:
 *       200:
 *         description: Successful response with the book
 *       400:
 *         description: Already rated!
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/:id/rating', auth, bookControl.rateBook);
module.exports = router;
