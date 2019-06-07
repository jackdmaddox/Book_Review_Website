const express = require('express'), 
    router = express.Router();
const BooksModels = require('../models/books-models');
const ReviewModels = require('../models/reviews-models');
const User = require('../models/users-model');

router.get('/', async (req,res,next) => {
    const allBooks = await BooksModels.getAll();
    res.render('template', {
        locals: {
            title: 'Books',
            booksList: allBooks,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-books',
        }
    });
});

router.get('/:id', async (req, res,next) => {
    const bookId = req.params.id;
    const singleBook = await BooksModels.getById(bookId);
    const singleBookReview = await ReviewModels.getById(bookId);
    res.render('template', {
        locals: {
            title: 'Book Review',
            bookDetails: singleBook,
            bookReview: singleBookReview,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-reviews',
        }
    });
});

router.post('/', (req, res) => {
    const { title, title_long, isbn, publisher, date_published} = req.body;

    BooksModels.add(title, title_long, isbn, publisher, date_published)
    .then(async () => {
        const allBooks = await BooksModels.getAll();
        
        res.status(200).render('template', {
            locals: {
                title: 'Books Updated',
                booksList: allBooks
            },
            partials: {
                partial: 'partial-books',
            }
        });
    })
        .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

router.post('/update', (req, res) => {
    const { score, content, book_id, user_id} = req.body;
    ReviewModels.addReview(score, content, book_id,user_id)
    .then(async () => {
        res.redirect('/');
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

module.exports = router;