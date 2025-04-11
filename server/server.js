import express from 'express';
import cors from 'cors';
// import './db/config.js';
import { findRecipesByDishName } from './db/queries.js';

const app = express()
const router = express.Router()

app.use(cors());

router.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/search', async (req, res) => {
  console.log(req.query)
    const dish = req.query.dish;
    const submit = req.query.submit;
    const recipes = await findRecipesByDishName(dish);
    // try { 
    // } catch (error) {
    // }
    console.log('recipes: ', recipes);
    console.log(`Found ${recipes.length} matching recipes:`);
    // console.error('Error:', error);
    res.status(200).json(recipes);
})


// module.exports = app;
app.listen(process.env.PORT || 3000)
