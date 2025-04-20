// MONGODB setup
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const mongoURI = 'mongodb://localhost:27017/recipes_db';
// dotenv.config({ path: '../../.env' })
dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

if (mongoose.connection.readyState === 1) {
    console.log('Connected to database:', mongoose.connection.db.databaseName);
  }