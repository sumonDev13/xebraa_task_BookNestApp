const buildSearchQuery = ({ genre, priceRange, publishDate }) => {
    const query = {};
  
    if (genre) {
      query.genre = genre;
    }
  
    if (priceRange) {
      const [min, max] = priceRange.split(',').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        query.price = { $gte: min, $lte: max };
      }
    }
  
    if (publishDate) {
      const date = new Date(publishDate);
      if (!isNaN(date.getTime())) {
        query.publishDate = { $gte: date };
      }
    }
  
    return query;
  };
  
  const buildPaginationOptions = ({ page = 1, limit = 10, sortBy = 'publishDate', sortOrder = 'desc' }) => {
    const options = {
      page: Math.max(1, parseInt(page)),
      limit: Math.min(100, Math.max(1, parseInt(limit))),
      skip: 0,
      sort: {}
    };
  
    options.skip = (options.page - 1) * options.limit;
    options.sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  
    return options;
  };
  
  module.exports = {
    buildSearchQuery,
    buildPaginationOptions
  };
  