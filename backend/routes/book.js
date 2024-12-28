const express = require('express');
const router = express.Router();
const { addBook, searchBooks,getAveragePriceByGenre, getPopularAuthors, getAllBooks } = require('../controllers/bookController');
const { validateToken } = require('../middleware/authMiddleware');

router.post('/add',validateToken, addBook);
router.get('/search', searchBooks);
router.get('/average-price', getAveragePriceByGenre);
router.get('/popular-authors', getPopularAuthors);
router.get('/allBooks',getAllBooks);

module.exports = router;