const buildAggregationPipeline = (type, params) => {
    const pipelines = {
      averagePrice: [
        { 
          $match: params.genre ? { genre: params.genre } : {} 
        },
        {
          $group: {
            _id: '$genre',
            averagePrice: { $avg: '$price' },
            count: { $sum: 1 }
          }
        }
      ],
      popularAuthors: [
        {
          $group: {
            _id: '$author',
            count: { $sum: 1 },
            averagePrice: { $avg: '$price' },
            genres: { $addToSet: '$genre' }
          }
        },
        {
          $match: {
            count: { $gte: params.minBooks }
          }
        },
        {
          $sort: { 
            count: -1,
            averagePrice: -1 
          }
        },
        {
          $limit: params.limit
        }
      ]
    };
  
    return pipelines[type] || [];
  };
  
  module.exports = {
    buildAggregationPipeline
  };
  