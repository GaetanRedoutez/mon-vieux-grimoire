const express = require('express');

const Book = require('../models/Book');

//TODO Commenter la fonction
exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json({ books }))
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

      res.status(200).json({ bestBooks });
    })
    .catch((error) => res.status(400).json({ error }));
};

//TODO Commenter la fonction
exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json({ book }))
    .catch((error) => res.status(404).json({ error }));
};

//TODO Ajouter auth
//TODO Commenter la fonction
exports.createBook = (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: 'Book added !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Book deleted !' }))
    .catch((error) => res.status(404).json({ error }));
};
