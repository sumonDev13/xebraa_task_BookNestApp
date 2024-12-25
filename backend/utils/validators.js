const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  const validateBook = ({ title, author, genre, price }) => {
    if (!title || typeof title !== 'string') {
      return 'Title is required and must be a string';
    }
  
    if (!author || typeof author !== 'string') {
      return 'Author is required and must be a string';
    }
  
    if (!genre || typeof genre !== 'string') {
      return 'Genre is required and must be a string';
    }
  
    if (!price || isNaN(price) || price < 0) {
      return 'Price is required and must be a positive number';
    }
  
    return null;
  };
  
  const validateSearchParams = ({ genre, priceRange, publishDate, page, limit }) => {
    if (priceRange) {
      const [min, max] = priceRange.split(',').map(Number);
      if (isNaN(min) || isNaN(max) || min < 0 || max < min) {
        return 'Invalid price range format. Use min,max format with positive numbers';
      }
    }
  
    if (publishDate && isNaN(new Date(publishDate).getTime())) {
      return 'Invalid publish date format';
    }
  
    if (page && (isNaN(page) || page < 1)) {
      return 'Page must be a positive number';
    }
  
    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      return 'Limit must be between 1 and 100';
    }
  
    return null;
  };

  const validateAnalyticsParams = (params) => {
    const { genre, limit, minBooks } = params;
  
    if (genre && typeof genre !== 'string') {
      return 'Genre must be a string';
    }
  
    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
      return 'Limit must be a number between 1 and 100';
    }
  
    if (minBooks && (isNaN(minBooks) || minBooks < 1)) {
      return 'Minimum books count must be a positive number';
    }
  
    return null;
  };
  
  
  module.exports = {
    validateBook,
    validateSearchParams,
    validateEmail,
    validateAnalyticsParams
  };