const User = require('../models/User');

/**
 * Ensures that the users collection exists and indexes are applied.
 * Mongoose's `createIndexes()` will create the collection if it doesn't exist.
 */
const ensureDbSetup = async () => {
  try {
    await User.createIndexes();
    console.log('User collection and indexes ensured.');
  } catch (error) {
    console.error('Error ensuring User collection and indexes:', error);
  }
};

module.exports = ensureDbSetup; 