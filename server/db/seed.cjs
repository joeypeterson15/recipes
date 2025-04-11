// import mongoose from 'mongoose'
// import fs from 'fs'
// import csv from 'csv'
// import path from 'path'
// import Recipe from './models/Recipe'
// const csvFilePath = './recipes.csv';
const Recipe = require('./models/Recipe.js');
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const csvFilePath = path.resolve(__dirname, 'recipes.csv');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipes_db')
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
    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    // Process CSV data
    const recipeMap = new Map();
    
    // Create a promise that resolves when CSV processing is complete
    const processCSV = new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          // Extract data from row
          const dishName = row['Dish name'];
          const quantity = row['Quantity'] ? parseFloat(row['Quantity']) : null;
          const unitOfMeasure = row['Unit of Measure'] || '';
          const ingredientName = row['Ingredients'];
          
          if (!dishName || !ingredientName) return;
          
          // If this recipe doesn't exist in our map yet, create it
          if (!recipeMap.has(dishName)) {
            recipeMap.set(dishName, {
              name: dishName,
              ingredients: []
            });
          }
          
          // Add this ingredient to the recipe
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
    
    // Wait for CSV processing to complete
    await processCSV;
    
    // Convert Map to Array for insertion
    const recipes = Array.from(recipeMap.values());
    
    // Insert recipes into database
    const result = await Recipe.insertMany(recipes);
    console.log(`Added ${result.length} recipes to the database`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
    process.exit(1);
  }
}