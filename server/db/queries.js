const {MongoClient} = require('mongodb');
const uri = 'mongodb://localhost:27017'; // Replace with your connection string
const client = new MongoClient(uri);
await client.connect();

async function findRecipesByDishName(dishName) {  
    try {      
      const database = client.db('recipes_db')
      const recipesCollection = database.collection('recipes');
      
      // Query for recipes matching the dish name
      // Using a case-insensitive regex for better matching
      const query = { dishName: { $regex: dishName, $options: 'i' } };
      
      const matchingRecipes = await recipesCollection.find(query).toArray();
      
      return matchingRecipes;
    } finally {
      await client.close();
    }
  }