const Book = require('../models/Book');

//TODO Commenter la fonction
exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

//TODO Commenter la fonction
exports.getBestRatingBooks = (req, res, next) => {
  delete req.body._id;
  console.log('Request body:', req.body);
  Book.find()
    .then((books) => {
      const sortedBooks = [...books].sort(
        (a, b) => b.averageRating - a.averageRating
      );

      const bestBooks = sortedBooks.slice(0, 3);

      res.status(200).json(bestBooks);
    })
    .catch((error) => res.status(400).json({ error }));
};

//TODO Commenter la fonction
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

//TODO Commenter la fonction
exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: 'Book added !' }))
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//TODO Commenter la fonction
exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Book deleted !' }))
    .catch((error) => res.status(404).json({ error }));
};

//TODO Commenter la fonction
exports.modifyBook = (req, res, next) => {
  let updatedBook = {};
  if (!req.body.book) {
    delete req.body._id;
    delete req.body.userId;
    updatedBook = {
      ...req.body,
      userId: req.auth.userId,
    };
  } else {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    updatedBook = {
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    };
  }
  console.log(updatedBook);

  Book.updateOne({ _id: req.params.id }, updatedBook)
    .then(() => res.status(201).json({ message: 'Book updated !' }))
    .catch((error) => res.status(400).json({ error }));
};

//TODO Commenter la fonction
//FIXME Quand on poste la nouvelle note on a plus l'affichage du livre
exports.rateBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error });
      }

      newRating = {
        userId: req.auth.userId,
        grade: req.body.rating,
      };

      book.ratings.push(newRating);

      let averageRating = 0.0;
      for (let index = 0; index < book.ratings.length; index++) {
        const element = book.ratings[index].grade;
        averageRating += element;
      }

      book.averageRating = averageRating / book.ratings.length;

      book
        .save()
        .then(res.status(201).json({ book, ratings }))
        .catch((error) => res.status(404).json({ error: error.message }));
    })
    .catch((error) => res.status(404).json({ error }));
};
