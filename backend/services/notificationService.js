const createNotification = (type, data) => {
    switch (type) {
      case 'BOOK_ADDED':
        return {
          type,
          title: 'New Book Added',
          message: `"${data.title}" by ${data.author} has been added to the library`,
          timestamp: new Date(),
          data
        };
      case 'BOOK_UPDATED':
        return {
          type,
          title: 'Book Updated',
          message: `"${data.title}" has been updated`,
          timestamp: new Date(),
          data
        };
      default:
        return {
          type,
          title: 'Notification',
          message: 'A new event occurred',
          timestamp: new Date(),
          data
        };
    }
  };
  
  module.exports = {
    createNotification
  };
  