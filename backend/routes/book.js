const express = require('express');
const router = express.Router();
const { addBook, searchBooks } = require('../controllers/bookController');

router.post('/add', addBook);
router.get('/search', searchBooks);

module.exports = router;