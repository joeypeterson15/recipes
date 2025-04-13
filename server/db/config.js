// MONGODB setup
const mongoURI = 'mongodb://localhost:27017/recipes_db';
import mongoose from 'mongoose'

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

if (mongoose.connection.readyState === 1) {
    console.log('Connected to database:', mongoose.connection.db.databaseName);
  }