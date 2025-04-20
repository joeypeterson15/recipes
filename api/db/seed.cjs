

require('dotenv')
const Recipe = require('./models/Recipe.js');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const mongoAtlas = process.env.MONGO_CONNECTION
const localMongo = 'mongodb://localhost:27017/recipes_db'


const csvFilePath = path.resolve(__dirname, 'recipes.csv');

mongoose.connect(mongoAtlas)
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    const recipeMap = new Map();
    
    const processCSV = new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          const dishName = row['Dish name'];
          const quantity = row['Quantity'] ? parseFloat(row['Quantity']) : null;
          const unitOfMeasure = row['Unit of Measure'] || '';
          const ingredientName = row['Ingredients'];
          
          if (!dishName || !ingredientName) return;
          
          if (!recipeMap.has(dishName)) {
            recipeMap.set(dishName, {
              name: dishName,
              ingredients: []
            });
          }
          
          const recipe = recipeMap.get(dishName);
          recipe.ingredients.push({
            name: ingredientName,
            quantity: quantity,
            unitOfMeasure: unitOfMeasure
          });
        })
        .on('end', () => {
          console.log('CSV file processed');
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
    
    await processCSV;
    
    const recipes = Array.from(recipeMap.values());
    
    const result = await Recipe.insertMany(recipes);
    console.log(`Added ${result.length} recipes to the database`);
    
    mongoose.disconnect();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
    process.exit(1);
  }
}