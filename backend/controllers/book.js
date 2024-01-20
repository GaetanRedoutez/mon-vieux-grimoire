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
//TODO Ajouter Gestion des fichiers avec multer
//TODO Commenter la fonction
//TODO Ajouter gestion des ratings
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

//TODO Ajouter auth
//TODO Commenter la fonction
exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Book deleted !' }))
    .catch((error) => res.status(404).json({ error }));
};

//TODO Ajouter auth
//TODO Gestion des fichiers avec multer
//TODO Commenter la fonction
exports.modifyBook = (req, res, next) => {
  delete req.body._id;
  delete req.body.userId;
  delete req.body.ratings;
  delete req.body.averageRating;
  Book.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.status(201).json({ message: 'Book updated !' }))
    .catch((error) => res.status(400).json({ error }));
};

//!!! Ne fonctionne pas
//TODO Ajouter auth
//TODO Commenter la fonction
//TODO MAJ averageRating
exports.rateBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      const ratings = new Book.ratings({
        userId: req.body.userId,
        grade: req.body.grade,
      });

      ratings
        .save()
        .then(res.status(201).json({ book, ratings }))
        .catch((error) => res.status(404).json({ error: error.message }));
    })
    .catch((error) => res.status(404).json({ error }));
};
