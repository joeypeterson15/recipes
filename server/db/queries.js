import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
await client.connect();

export async function findRecipesByDishName(dishName) {
  try {
    const db = client.db('recipes_db');
    const recipes = db.collection('recipes');
    const query = { dishName: { $regex: dishName, $options: 'i' } };
    return await recipes.find(query).toArray();
  } finally {
    await client.close();
  }
}
