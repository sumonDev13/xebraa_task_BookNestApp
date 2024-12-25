const Book = require('../models/Book');
const { createError } = require('../utils/errorHandler');
const { validateBook, validateSearchParams, validateAnalyticsParams } = require('../utils/validators');
const { buildSearchQuery, buildPaginationOptions } = require('../utils/queryBuilder');
const { buildAggregationPipeline } = require('../utils/aggregationBuilder');

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

const getAveragePriceByGenre = async (req, res, next) => {
  try {
    const { genre } = req.query;

    // Validate parameters
    const validationError = validateAnalyticsParams({ genre });
    if (validationError) {
      throw createError(400, validationError);
    }

    const pipeline = buildAggregationPipeline('averagePrice', { genre });
    const result = await Book.aggregate(pipeline);

    // Handle case when no books found
    if (!result.length) {
      return res.status(200).json({
        success: true,
        data: {
          genre,
          averagePrice: 0,
          booksCount: 0
        }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        genre: result[0]._id,
        averagePrice: parseFloat(result[0].averagePrice.toFixed(2)),
        booksCount: result[0].count
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPopularAuthors = async (req, res, next) => {
  try {
    const { limit = 10, minBooks = 1 } = req.query;

    // Validate parameters
    const validationError = validateAnalyticsParams({ limit, minBooks });
    if (validationError) {
      throw createError(400, validationError);
    }

    const pipeline = buildAggregationPipeline('popularAuthors', { 
      limit: parseInt(limit), 
      minBooks: parseInt(minBooks) 
    });
    const result = await Book.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: result.map(author => ({
        author: author._id,
        bookCount: author.count,
        averagePrice: parseFloat(author.averagePrice.toFixed(2)),
        genres: author.genres
      }))
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  searchBooks,
  getAveragePriceByGenre,
  getPopularAuthors
};
