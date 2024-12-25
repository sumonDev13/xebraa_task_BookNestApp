const express = require('express');
const router = express.Router();
const { addBook, searchBooks,getAveragePriceByGenre, getPopularAuthors } = require('../controllers/bookController');

router.post('/add', addBook);
router.get('/search', searchBooks);
router.get('/average-price', getAveragePriceByGenre);
router.get('/popular-authors', getPopularAuthors);

module.exports = router;