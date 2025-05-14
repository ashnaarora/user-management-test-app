const express = require('express');
const mongoose = require('mongoose');
const ensureDbSetup = require('./config/mongoSetup');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

//user-ms routes
app.use('/api/users', require('./routes/users'));

const getMongoUri = () => {
  const argPrefix = '--mongo_uri=';
  const mongoUriArg = process.argv.find(arg => arg.startsWith(argPrefix)) ?? process.env.MONGO_URI;
  if (mongoUriArg) {
    return mongoUriArg;
  }

  // Default value
  return 'mongodb://localhost:27017/user_management';
};

const MONGO_URI = getMongoUri();

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully.');
    // ensuring that the users collection exists and indexes are applied
    await ensureDbSetup();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 