import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
await client.connect();

export async function findRecipesByDishName(dishName) {
  const db = client.db('recipes_db');
  let recipes = db.collection('recipes');
  const query = { name: { $regex: dishName, $options: 'i' } };
  recipes = await recipes.find(query).toArray();
  return recipes
}
