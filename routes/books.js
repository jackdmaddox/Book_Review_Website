const express = require('express'), 
    router = express.Router();
const BooksModels = require('../models/books-models');
const ReviewModels = require('../models/reviews-models');
const User = require('../models/users-model');
const BooksController = require('../controllers/books-controllers');

router.get('/', BooksController.allBooks_get);

router.get('/:id', BooksController.bookById_get);

router.post('/', BooksController.addBook_post);

router.post('/update', BooksController.addReview_post);

module.exports = router;