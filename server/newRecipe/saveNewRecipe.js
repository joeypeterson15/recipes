import mongoose from 'mongoose'
import Recipe from '../db/models/Recipe.js'

async function saveNewRecipe(recipe) {
    mongoose.connect('mongodb://localhost:27017/recipes_db')
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