const Book = require('../models/Book');
const { createError } = require('../utils/errorHandler');
const { validateBook, validateSearchParams } = require('../utils/validators');
const { buildSearchQuery, buildPaginationOptions } = require('../utils/queryBuilder');

const addBook = async (req, res, next) => {
  try {
    const bookData = req.body;
    
    // Validate book data
    const validationError = validateBook(bookData);
    if (validationError) {
      throw createError(400, validationError);
    }

    const book = new Book(bookData);
    await book.save();

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const searchParams = req.query;
    
    // Validate search parameters
    const validationError = validateSearchParams(searchParams);
    if (validationError) {
      throw createError(400, validationError);
    }

    const query = buildSearchQuery(searchParams);
    const pagination = buildPaginationOptions(searchParams);

    const books = await Book.find(query)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort(pagination.sort);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        books,
        pagination: {
          total,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(total / pagination.limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  searchBooks
};
