// MONGODB setup
const mongoURI = 'mongodb://localhost:27017/recipes_db';

const mongoose = require('mongoose')
// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // The database will be created automatically if it doesn't exist
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

if (mongoose.connection.readyState === 1) {
    console.log('Connected to database:', mongoose.connection.db.databaseName);
  }