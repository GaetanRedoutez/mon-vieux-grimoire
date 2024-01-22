const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const bookControl = require('../controllers/book');

router.get('/', bookControl.getAllBooks);
router.post('/', auth, multer, bookControl.createBook);

router.get('/bestrating', bookControl.getBestRatingBooks);

router.get('/:id', bookControl.getOneBook);
router.delete('/:id', auth, bookControl.deleteBook);
router.put('/:id', auth, multer, bookControl.modifyBook);
router.post('/:id/rating', auth, bookControl.rateBook);

module.exports = router;
