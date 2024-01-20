const express = require('express');
const router = express.Router();

const bookControl = require('../controllers/book');

router.get('/', bookControl.getAllBooks);
router.post('/', bookControl.createBook);

router.get('/bestrating', bookControl.getBestRatingBooks);

router.get('/:id', bookControl.getOneBook);
router.delete('/:id', bookControl.deleteBook);
router.put('/:id', bookControl.modifyBook);
router.post('/:id/rating', bookControl.rateBook);

module.exports = router;
