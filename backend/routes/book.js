const express = require('express');
const router = express.Router();

const bookControl = require('../controllers/book');

router.get('/', bookControl.getAllBooks);
router.post('/', bookControl.createBook);

router.get('/bestrating', bookControl.getBestRatingBooks);

router.get('/:id', bookControl.getOneBook);
router.delete('/:id', bookControl.deleteBook);

module.exports = router;
