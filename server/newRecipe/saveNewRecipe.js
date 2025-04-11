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
    
    // const real_recipe = ```json { "name": "Chicken Soup", "ingredients": [ { "name": "Chicken", "quantity": 2, "unitOfMeasure": "pounds" }, { "name": "Carrots", "quantity": 4, "unitOfMeasure": "whole" }, { "name": "Celery stalks", "quantity": 4, "unitOfMeasure": "whole" }, { "name": "Onion", "quantity": 1, "unitOfMeasure": "large" }, { "name": "Garlic", "quantity": 4, "unitOfMeasure": "cloves" }, { "name": "Chicken broth", "quantity": 8, "unitOfMeasure": "cups" }, { "name": "Water", "quantity": 4, "unitOfMeasure": "cups" }, { "name": "Salt", "quantity": 2, "unitOfMeasure": "teaspoons" }, { "name": "Black pepper", "quantity": 1, "unitOfMeasure": "teaspoon" }, { "name": "Parsley", "quantity": 0.5, "unitOfMeasure": "cup" }, { "name": "Bay leaves", "quantity": 2, "unitOfMeasure": "whole" } ] } ```
    // const bad_recipe = ```json { "name": "Not Found", "ingredients": [] } ```
    // const recipe = JSON.parse(real_recipe) //remove after testing

    await Recipe.insertOne(recipe)
    console.log(`Added recipe to the database`);

    mongoose.disconnect();
    console.log('Database connection closed');

    // return result

}

export default saveNewRecipe;