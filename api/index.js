import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import { findRecipesByDishName } from './db/queries.js';
import saveNewRecipe from './newRecipe/saveNewRecipe.js';
import { getChatGPTRecipe } from './newRecipe/getChatGPTRecipe.js';

const app = express();
app.use(cors());

app.get('/api/search', async (req, res) => {
  const dish = req.query.dish;
  const submit = req.query.submit;
  const recipes = await findRecipesByDishName(dish);

  if (dish.length > 0 && recipes.length === 0 && submit === 'y') {
    try {
      const recipe = await getChatGPTRecipe(dish);
      await saveNewRecipe(recipe);
      res.status(201).json([recipe]);
    } catch (error) {
      console.error('error not found:', error);
      res.status(500).json({ error: 'Error fetching recipe' });
    }
  } else {
    res.status(200).send(recipes);
  }
});

export const handler = serverless(app);