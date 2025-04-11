import express from 'express';
import cors from 'cors';
// import './db/config.js';
import { findRecipesByDishName } from './db/queries.js';
import { getNewRecipe } from './newRecipe.js';

const app = express()
const router = express.Router()

app.use(cors());

router.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/search', async (req, res) => {
    const dish = req.query.dish;
    const submit = req.query.submit;
    const recipes = await findRecipesByDishName(dish);
    res.status(200).send(recipes)
    // if (dish.length > 0 && recipes.length == 0 && submit == 'y') {
      // } 
      // let recipe = await getNewRecipe(dish)
      // console.log('recipe chatgpt:', recipe.output_text)
})


// module.exports = app;
app.listen(process.env.PORT || 3000)
