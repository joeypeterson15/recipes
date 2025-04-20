import mongoose from 'mongoose'
import Recipe from '../db/models/Recipe.js'
import dotenv from 'dotenv'

dotenv.config()

async function saveNewRecipe(recipe) {
    mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

    await Recipe.insertOne(recipe)
    console.log(`Added recipe to the database`);

}

export default saveNewRecipe;